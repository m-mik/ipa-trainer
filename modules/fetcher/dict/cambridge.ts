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

function createWordDefinition(
  partOfSpeech: PartOfSpeech,
  section: Cheerio<Element>
) {
  const wordDefinition = {
    name: section.find('.dhw')?.first().text(),
    partOfSpeech,
    definition: section
      .find('.def')
      .first()
      ?.text()
      .trim()
      .replace(/\s{2,}/g, ' ')
      .replace(':', ''),
    pronunciations: [
      {
        symbols: '.pos-header > .uk .ipa',
        audio: '.uk source:first-of-type',
        language: Language.UK,
      },
      {
        symbols: '.pos-header > .us .ipa',
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

function extractWordDefinitionsFromSection(
  section: Cheerio<Element>
): WordDefinition[] {
  const partsOfSpeech = section
    .find('.pos')
    .map(
      (index, element) =>
        cheerio.load(element).text().toUpperCase() as PartOfSpeech
    )
    .toArray()

  return partsOfSpeech.map((partOfSpeech) =>
    createWordDefinition(partOfSpeech, section)
  )
}

const buildAudioUrl = (baseUrl: string, audioPath: string | undefined) =>
  audioPath ? `${baseUrl}${audioPath}` : ''

export default cambridge
