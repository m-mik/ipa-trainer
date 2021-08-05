import cheerio, { Cheerio, Element } from 'cheerio'
import { buildAudioUrl, Dictionary, FetchedWord } from '../index'
import { PartOfSpeech } from '@prisma/client'

const cambridge: Dictionary = {
  name: 'Cambridge Dictionary',
  baseUrl: 'https://dictionary.cambridge.org',
  searchUrl: 'https://dictionary.cambridge.org/dictionary/english/%s',
  parse: (html) => {
    const $ = cheerio.load(html)
    const sections = $('.pr.dictionary:first-of-type .pos-header')
    return sections
      .map((_, section) => extractWordFromSection($(section)))
      .toArray()
  },
}

export const extractWordFromSection = (
  section: Cheerio<Element>
): FetchedWord => {
  return {
    word: section.find('.hw.dhw')?.text(),
    ukIpa: section.find('.uk .ipa')?.text(),
    ukIpaAlt: section.find('.uk + span:not(.dpron-i) .ipa')?.text(),
    ukAudio: buildAudioUrl(
      cambridge.baseUrl,
      section.find('.uk source:first-of-type')?.attr('src')
    ),
    usIpa: section.find('.us .ipa')?.text(),
    usIpaAlt: section.find('.us + span:not(.dpron-i) .ipa')?.text(),
    usAudio: buildAudioUrl(
      cambridge.baseUrl,
      section.find('.us source:first-of-type')?.attr('src')
    ),
    partOfSpeech: section.find('.pos')?.text().toUpperCase() as PartOfSpeech,
  }
}

export default cambridge
