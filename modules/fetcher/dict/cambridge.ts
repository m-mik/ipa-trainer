import cheerio, { Cheerio, Element } from 'cheerio'
import { buildAudioUrl, Dictionary, FetchedWordInfo } from '@/lib/word/fetcher'
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
  s: Cheerio<Element>
): FetchedWordInfo => {
  return {
    word: s.find('.hw.dhw')?.text(),
    ukIpa: s.find('.uk .ipa')?.text(),
    ukIpaAlt: s.find('.uk + span:not(.dpron-i) .ipa')?.text(),
    ukAudio: buildAudioUrl(
      cambridge.baseUrl,
      s.find('.uk source:first-of-type')?.attr('src')
    ),
    usIpa: s.find('.us .ipa')?.text(),
    usIpaAlt: s.find('.us + span:not(.dpron-i) .ipa')?.text(),
    usAudio: buildAudioUrl(
      cambridge.baseUrl,
      s.find('.us source:first-of-type')?.attr('src')
    ),
    partOfSpeech: s.find('.pos')?.text().toUpperCase() as PartOfSpeech,
  }
}

export default cambridge
