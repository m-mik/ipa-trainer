import cheerio, { Cheerio, Element } from 'cheerio'
import { Language, PartOfSpeech } from '@prisma/client'
import {
  buildAudioUrl,
  Dictionary,
  FetchedPronunciationList,
} from '../fetchPronunciations'

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

  const ukPronunciation = {
    symbols: section.find('.uk .ipa')?.text(),
    audio: buildAudioUrl(
      cambridge.baseUrl,
      section.find('.uk source:first-of-type')?.attr('src')
    ),
    language: Language.UK,
  }

  const usPronunciation = {
    symbols: section.find('.us .ipa')?.text(),
    audio: buildAudioUrl(
      cambridge.baseUrl,
      section.find('.us source:first-of-type')?.attr('src')
    ),
    language: Language.US,
  }

  return {
    [partOfSpeech]: [ukPronunciation, usPronunciation],
  }
}

export default cambridge
