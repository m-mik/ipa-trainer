import cheerio, { Cheerio, Element } from 'cheerio'
import { Language, PartOfSpeech } from '@prisma/client'
import { Dictionary, WordDefinition } from '../types'

const cambridge: Dictionary = {
  name: 'Cambridge Dictionary',
  baseUrl: 'https://dictionary.cambridge.org',
  searchUrl: 'https://dictionary.cambridge.org/dictionary/english/%s',
  parse: (html) => {
    const $ = cheerio.load(html)
    const sections = $('.pr.dictionary:first-of-type .entry-body__el')
    return sections
      .map((_, section) => extractWordDefinitionsFromSection($(section)))
      .toArray()
  },
}

function extractWordDefinitionsFromSection(
  section: Cheerio<Element>
): WordDefinition {
  const wordDefinition = {
    name: section.find('.dhw')?.first().text(),
    partOfSpeech: section
      .find('.pos:first-of-type')
      ?.text()
      .toUpperCase() as PartOfSpeech,
    definition: section
      .find('.def')
      .first()
      ?.text()
      .trim()
      .replace(/\s{2,}/g, ' ')
      .replace(':', ''),
    pronunciations: [
      {
        symbols: '.uk .ipa',
        audio: '.uk source:first-of-type',
        language: Language.UK,
      },
      {
        symbols: '.us .ipa',
        audio: '.us source:first-of-type',
        language: Language.US,
      },
      {
        symbols: '.uk.dpron-i + span:not(.us) .ipa',
        audio: '.us source:first-of-type',
        language: Language.UK,
      },
      {
        symbols: '.us.dpron-i + span:not(.uk) .ipa',
        audio: '.us source:first-of-type',
        language: Language.US,
      },
    ].map((item) => ({
      symbols: section.find(item.symbols)?.text(),
      audio: buildAudioUrl(
        cambridge.baseUrl,
        section.find(item.audio)?.attr('src')
      ),
      language: item.language,
    })),
  }

  const {
    pronunciations: [uk, us],
  } = wordDefinition
  if (!us.symbols) us.symbols = uk.symbols

  return {
    ...wordDefinition,
    pronunciations: wordDefinition.pronunciations.filter(
      (item) => item.symbols
    ),
  }
}

const buildAudioUrl = (baseUrl: string, audioPath: string | undefined) =>
  audioPath ? `${baseUrl}${audioPath}` : ''

export default cambridge
