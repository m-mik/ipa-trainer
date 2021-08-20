import {
  getAlphabetSymbols,
  removeUnansweredQuestionSymbols,
  symbolsToArray,
  getAnswerCountByType,
} from '@/modules/lesson/utils'
import { Alphabet } from '@/data/IPA'
import { Answer, Language, LessonStatus, PartOfSpeech } from '@prisma/client'
import { LessonWithPronunciations } from '@/types/LessonWithPronunciations'

describe('getAnswerCountByType', () => {
  it('returns the correct count', () => {
    expect(getAnswerCountByType([])).toEqual({
      CORRECT: 0,
      INCORRECT: 0,
      NONE: 0,
    })
    expect(
      getAnswerCountByType([
        { answer: Answer.CORRECT },
        { answer: Answer.CORRECT },
      ])
    ).toEqual({
      CORRECT: 2,
      INCORRECT: 0,
      NONE: 0,
    })

    expect(
      getAnswerCountByType([
        { answer: Answer.NONE },
        { answer: Answer.INCORRECT },
      ])
    ).toEqual({
      CORRECT: 0,
      INCORRECT: 1,
      NONE: 1,
    })
  })
})

describe('symbolsToArray', () => {
  it('converts a symbols string to an array of symbols', () => {
    expect(symbolsToArray('prəˌnʌn.siˈeɪ.ʃən')).toEqual([
      'p',
      'r',
      'ə',
      'ˌ',
      'n',
      'ʌ',
      'n',
      '.',
      's',
      'i',
      'ˈ',
      'eɪ',
      '.',
      'ʃ',
      'ə',
      'n',
    ])
    expect(symbolsToArray('pleɪn')).toEqual(['p', 'l', 'eɪ', 'n'])
    expect(symbolsToArray('')).toEqual([])
    expect(symbolsToArray('dɒɡ')).toEqual(['d', 'ɒ', 'ɡ'])
    expect(symbolsToArray('dɑːɡ')).toEqual(['d', 'ɑː', 'ɡ'])
    expect(symbolsToArray('eɪ')).toEqual(['eɪ'])
    expect(symbolsToArray('ɒ')).toEqual(['ɒ'])
    expect(symbolsToArray('bɪ')).toEqual(['b', 'ɪ'])
  })
})

describe('removeUnansweredQuestionSymbols', () => {
  let lessonWithPronunciations: LessonWithPronunciations
  beforeEach(() => {
    lessonWithPronunciations = {
      id: 'lessonid',
      questions: [
        {
          id: 'questionid1',
          word: {
            name: 'dog',
            definition:
              'a common animal with four legs, especially kept by' +
              ' people as a pet or to hunt or guard things',
            partOfSpeech: PartOfSpeech.NOUN,
            pronunciations: [
              {
                id: 'pronunciationid',
                symbols: 'dɑːɡ',
                language: Language.US,
                audio:
                  'https://dictionary.cambridge.org/media/english/us_pron/d/dog/dog__/dog.mp3',
              },
            ],
          },
          answer: Answer.NONE,
        },
        {
          id: 'questionid2',
          word: {
            name: 'cat',
            definition:
              'a small animal with fur, four legs, a tail, and claws, ' +
              'usually kept as a pet or for catching mice',
            partOfSpeech: PartOfSpeech.NOUN,
            pronunciations: [
              {
                id: 'pronunciationid',
                symbols: 'kæt',
                language: Language.US,
                audio:
                  'https://dictionary.cambridge.org/media/english/us_pron/c/cat/cat__/cat.mp3',
              },
            ],
          },
          answer: Answer.CORRECT,
        },
      ],
      status: LessonStatus.ACTIVE,
    }
  })

  it('removes symbols for unanswered questions', () => {
    expect(removeUnansweredQuestionSymbols(lessonWithPronunciations)).toEqual({
      id: 'lessonid',
      questions: [
        {
          id: 'questionid1',
          word: {
            name: 'dog',
            definition:
              'a common animal with four legs, especially kept by' +
              ' people as a pet or to hunt or guard things',
            partOfSpeech: PartOfSpeech.NOUN,
            pronunciations: [
              {
                id: 'pronunciationid',
                language: Language.US,
                audio:
                  'https://dictionary.cambridge.org/media/english/us_pron/d/dog/dog__/dog.mp3',
              },
            ],
          },
          answer: Answer.NONE,
        },
        {
          id: 'questionid2',
          word: {
            name: 'cat',
            definition:
              'a small animal with fur, four legs, a tail, and claws, ' +
              'usually kept as a pet or for catching mice',
            partOfSpeech: PartOfSpeech.NOUN,
            pronunciations: [
              {
                id: 'pronunciationid',
                symbols: 'kæt',
                language: Language.US,
                audio:
                  'https://dictionary.cambridge.org/media/english/us_pron/c/cat/cat__/cat.mp3',
              },
            ],
          },
          answer: Answer.CORRECT,
        },
      ],
      status: LessonStatus.ACTIVE,
    })
  })
})

describe('getAlphabetSymbols', () => {
  let alphabet: Alphabet

  beforeEach(() => {
    alphabet = {
      consonants: {
        voiced: [{ id: 15, name: 'b', example: '[b]ook' }],
        voiceless: [{ id: 33, name: 'f', example: '[f]ish' }],
      },
      vowels: {
        long: [{ id: 4, name: 'ɔː', example: 'h[o]rse' }],
        short: [{ id: 9, name: 'ɒ', example: 's[o]ck', language: Language.UK }],
      },
      diphthongs: [{ id: 38, name: 'eɪ', example: 'd[ay]' }],
      other: [
        { id: 48, name: 'ɒ', example: 'croiss[ant]', language: Language.UK },
      ],
    }
  })

  it('returns the correct alphabet symbols', () => {
    expect(getAlphabetSymbols(alphabet)).toEqual([
      {
        example: 'h[o]rse',
        id: 4,
        name: 'ɔː',
      },
      {
        example: 's[o]ck',
        id: 9,
        language: 'UK',
        name: 'ɒ',
      },
      {
        example: '[b]ook',
        id: 15,
        name: 'b',
      },
      {
        example: '[f]ish',
        id: 33,
        name: 'f',
      },
      {
        example: 'd[ay]',
        id: 38,
        name: 'eɪ',
      },
      {
        example: 'croiss[ant]',
        id: 48,
        language: 'UK',
        name: 'ɒ',
      },
    ])
  })

  it('filters symbols for the specified language', () => {
    expect(getAlphabetSymbols(alphabet, Language.US)).toEqual([
      {
        example: 'h[o]rse',
        id: 4,
        name: 'ɔː',
      },
      {
        example: '[b]ook',
        id: 15,
        name: 'b',
      },
      {
        example: '[f]ish',
        id: 33,
        name: 'f',
      },
      {
        example: 'd[ay]',
        id: 38,
        name: 'eɪ',
      },
    ])
  })
})
