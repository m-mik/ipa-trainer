import cheerio, { Cheerio, Element } from 'cheerio'
import { Language, PartOfSpeech } from '@prisma/client'
import {
  Dictionary,
  FetchedPronunciation,
  FetchedPronunciationList,
} from '../types'

const cambridge: Dictionary = {
  name: 'Cambridge Dictionary',
  baseUrl: 'https://dictionary.cambridge.org',
  searchUrl: 'https://dictionary.cambridge.org/dictionary/english/%s',
  parse: (html) => {
    const $ = cheerio.load(html)
    const sections = $('.pr.dictionary:first-of-type .pos-header')
    return sections
      .map((_, section) => extractPronunciationsFromSection($(section)))
      .toArray()
      .reduce((result, pronunciation) => ({ ...result, ...pronunciation }), {})
  },
}

function extractPronunciationsFromSection(
  section: Cheerio<Element>
): FetchedPronunciationList {
  const partOfSpeech = section
    .find('.pos')
    ?.text()
    .toUpperCase() as PartOfSpeech

  const config: FetchedPronunciation[] = [
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
  ]

  const generate = (config: FetchedPronunciation[]) =>
    config
      .map((item) => ({
        symbols: section.find(item.symbols)?.text(),
        audio: buildAudioUrl(
          cambridge.baseUrl,
          section.find(item.audio)?.attr('src')
        ),
        language: item.language,
      }))
      .filter((item) => item.symbols)

  return {
    [partOfSpeech]: generate(config),
  }
}

const buildAudioUrl = (baseUrl: string, audioPath: string | undefined) =>
  audioPath ? `${baseUrl}${audioPath}` : ''

export default cambridge
