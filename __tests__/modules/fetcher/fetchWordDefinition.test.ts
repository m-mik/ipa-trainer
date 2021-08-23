import fs from 'fs/promises'
import axios from 'axios'
import path from 'path'
import { fetchWordDefinition } from '@/modules/fetcher'
import { Language, PartOfSpeech } from '@prisma/client'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('fetchWordDefinition', () => {
  let data: Record<string, string>

  beforeAll(async () => {
    const words = ['dog', 'pronunciation', 'are', 'honor']
    const filesContents = await Promise.all(
      words.map(
        async (fileName) =>
          await fs.readFile(
            path.join(__dirname, 'responses', `${fileName}.html`),
            'utf-8'
          )
      )
    )
    data = words.reduce(
      (res, word, index) => ({ ...res, [word]: filesContents[index] }),
      {}
    )
  })

  it('returns undefined when the response data contains no definition', async () => {
    mockedAxios.get.mockResolvedValue({ data: '' })

    const wordDefinition = await fetchWordDefinition({
      name: 'dog',
      partOfSpeech: PartOfSpeech.NOUN,
    })

    expect(wordDefinition).toEqual(undefined)
  })

  it('handles: UK <uk_pronunciation> US <us_pronunciation>', async () => {
    mockedAxios.get.mockResolvedValue({ data: data.dog })

    const wordDefinition = await fetchWordDefinition({
      name: 'dog',
      partOfSpeech: PartOfSpeech.NOUN,
    })

    expect(wordDefinition).toEqual({
      definition:
        'a common animal with four legs, especially kept by people as a pet or to hunt or guard things',
      name: 'dog',
      partOfSpeech: PartOfSpeech.NOUN,
      pronunciations: [
        {
          audio:
            'https://dictionary.cambridge.org/media/english/uk_pron/u/ukd/ukdoc/ukdocud022.mp3',
          language: Language.UK,
          symbols: 'dɒɡ',
        },
        {
          audio:
            'https://dictionary.cambridge.org/media/english/us_pron/d/dog/dog__/dog.mp3',
          language: Language.US,
          symbols: 'dɑːɡ',
        },
      ],
    })
  })

  it('handles: US UK <pronunciation>', async () => {
    mockedAxios.get.mockResolvedValue({ data: data.pronunciation })

    const wordDefinition = await fetchWordDefinition({
      name: 'pronunciation',
      partOfSpeech: PartOfSpeech.NOUN,
    })

    expect(wordDefinition).toEqual({
      definition: 'how words are pronounced',
      name: 'pronunciation',
      partOfSpeech: PartOfSpeech.NOUN,
      pronunciations: [
        {
          audio:
            'https://dictionary.cambridge.org/media/english/uk_pron/u/ukp/ukpro/ukpromi029.mp3',
          language: Language.UK,
          symbols: 'prəˌnʌn.siˈeɪ.ʃən',
        },
        {
          audio:
            'https://dictionary.cambridge.org/media/english/us_pron/p/pro/pronu/pronunciation.mp3',
          language: Language.US,
          symbols: 'prəˌnʌn.siˈeɪ.ʃən',
        },
      ],
    })
  })

  it(`handles: UK <uk_pronunciation_1> <uk_pronunciation_2> US <us_pronunciation_1> <us_pronunciation_2>`, async () => {
    mockedAxios.get.mockResolvedValue({ data: data.are })

    const wordDefinition = await fetchWordDefinition({
      name: 'are',
      partOfSpeech: PartOfSpeech.VERB,
    })

    expect(wordDefinition).toEqual({
      definition: 'we/you/they form of be ',
      name: 'are',
      partOfSpeech: 'VERB',
      pronunciations: [
        {
          audio:
            'https://dictionary.cambridge.org/media/english/uk_pron/u/uka/ukarc/ukarchi014.mp3',
          language: 'UK',
          symbols: 'ɑːr',
        },
        {
          audio:
            'https://dictionary.cambridge.org/media/english/us_pron/a/are/are__/are.mp3',
          language: 'US',
          symbols: 'ɑːr',
        },
        {
          audio:
            'https://dictionary.cambridge.org/media/english/us_pron/a/are/are__/are.mp3',
          language: 'UK',
          symbols: 'ər',
        },
        {
          audio:
            'https://dictionary.cambridge.org/media/english/us_pron/a/are/are__/are.mp3',
          language: 'US',
          symbols: 'ɚ',
        },
      ],
    })
  })

  it(`handles cases where parts of speech are displayed in one line, e.g. HONOR noun, verb [ T ]`, async () => {
    mockedAxios.get.mockResolvedValue({ data: data.honor })

    const honorVerb = await fetchWordDefinition({
      name: 'honor',
      partOfSpeech: PartOfSpeech.VERB,
    })

    expect(honorVerb).toEqual({
      definition: 'US spelling of honour',
      name: 'honor',
      partOfSpeech: 'VERB',
      pronunciations: [
        {
          audio:
            'https://dictionary.cambridge.org/media/english/uk_pron/u/ukh/ukhon/ukhonor003.mp3',
          language: 'UK',
          symbols: 'ˈɒn.ər',
        },
        {
          audio:
            'https://dictionary.cambridge.org/media/english/us_pron/h/hon/honor/honor.mp3',
          language: 'US',
          symbols: 'ˈɑː.nɚ',
        },
      ],
    })

    const honorNoun = await fetchWordDefinition({
      name: 'honor',
      partOfSpeech: PartOfSpeech.NOUN,
    })

    expect(honorNoun).toEqual({
      definition: 'US spelling of honour',
      name: 'honor',
      partOfSpeech: 'NOUN',
      pronunciations: [
        {
          audio:
            'https://dictionary.cambridge.org/media/english/uk_pron/u/ukh/ukhon/ukhonor003.mp3',
          language: 'UK',
          symbols: 'ˈɒn.ər',
        },
        {
          audio:
            'https://dictionary.cambridge.org/media/english/us_pron/h/hon/honor/honor.mp3',
          language: 'US',
          symbols: 'ˈɑː.nɚ',
        },
      ],
    })
  })
})
