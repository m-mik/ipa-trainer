import {
  lessonUiReducer,
  LessonUiState,
} from '@/modules/lesson/store/lessonUiReducer'
import { Answer, Language, PartOfSpeech } from '@prisma/client'
import { ActionType } from '@/modules/lesson/store/lessonUiActions'
import { QuestionWithPronunciations } from '@/common/types/QuestionWithPronunciations'

describe('lessonUiReducer', () => {
  let initialState: LessonUiState
  beforeEach(() => {
    initialState = {
      symbols: [
        { id: 38, name: 'eɪ', example: 'd[ay]' },
        { id: 49, name: 'i', example: 'happ[y]' },
      ],
      activeSymbolIndex: null,
      activeQuestion: null,
      language: Language.US,
      audioVolume: 0.5,
      audioAutoPlay: true,
      isInitialized: false,
    }
  })

  it('handles ActionType.Initialize', () => {
    expect(
      lessonUiReducer(initialState, { type: ActionType.Initialize })
    ).toEqual({
      ...initialState,
      isInitialized: true,
    })
  })

  it('handles ActionType.AppendSymbol', () => {
    expect(
      lessonUiReducer(initialState, {
        type: ActionType.AppendSymbol,
        symbol: { id: 47, name: 'h', example: '[h]and' },
      })
    ).toEqual({
      ...initialState,
      symbols: [
        { id: 38, name: 'eɪ', example: 'd[ay]' },
        { id: 49, name: 'i', example: 'happ[y]' },
        { id: 47, name: 'h', example: '[h]and' },
      ],
    })
  })

  it('handles ActionType.RemoveSymbol', () => {
    expect(
      lessonUiReducer(initialState, {
        type: ActionType.RemoveSymbol,
        index: 0,
      })
    ).toEqual({
      ...initialState,
      symbols: [{ id: 49, name: 'i', example: 'happ[y]' }],
    })
  })

  it('handles ActionType.SetSymbol', () => {
    expect(
      lessonUiReducer(initialState, {
        type: ActionType.SetSymbol,
        payload: {
          symbol: { id: 41, name: 'aʊ', example: 'm[ou]th' },
          index: 0,
        },
      })
    ).toEqual({
      ...initialState,
      symbols: [
        { id: 41, name: 'aʊ', example: 'm[ou]th' },
        { id: 49, name: 'i', example: 'happ[y]' },
      ],
    })
  })

  it('handles ActionType.ResetSymbols', () => {
    expect(
      lessonUiReducer(initialState, { type: ActionType.ResetSymbols })
    ).toEqual({
      ...initialState,
      symbols: [],
    })
  })

  it('handles ActionType.SetActiveSymbolIndex', () => {
    expect(
      lessonUiReducer(initialState, {
        type: ActionType.SetActiveSymbolIndex,
        index: 1,
      })
    ).toEqual({
      ...initialState,
      activeSymbolIndex: 1,
    })
  })

  it('handles ActionType.ResetActiveSymbolIndex', () => {
    expect(
      lessonUiReducer(initialState, { type: ActionType.ResetActiveSymbolIndex })
    ).toEqual({
      ...initialState,
      activeQuestion: null,
    })
  })

  it('handles ActionType.SetActiveQuestion', () => {
    const question: QuestionWithPronunciations = {
      id: 'questionid',
      answer: Answer.NONE,
      word: {
        name: 'dog',
        partOfSpeech: PartOfSpeech.NOUN,
        definition:
          'a common animal with four legs, especially kept by people ' +
          'as a pet or to hunt or guard things',
        pronunciations: [
          {
            id: 'pronunciationid',
            language: Language.US,
            audio:
              'https://dictionary.cambridge.org/media/english/us_pron/d/dog/dog__/dog.mp3',
          },
        ],
      },
    }

    expect(
      lessonUiReducer(initialState, {
        type: ActionType.SetActiveQuestion,
        question,
      })
    ).toEqual({
      ...initialState,
      activeQuestion: question,
    })
  })

  it('handles ActionType.DropSymbol', () => {
    expect(
      lessonUiReducer(initialState, {
        type: ActionType.DropSymbol,
        payload: { sourceIndex: 0, destinationIndex: 1 },
      })
    ).toEqual({
      ...initialState,
      symbols: [
        {
          example: 'happ[y]',
          id: 49,
          name: 'i',
        },
        {
          example: 'd[ay]',
          id: 38,
          name: 'eɪ',
        },
      ],
    })
  })

  it('handles ActionType.SetLanguage', () => {
    expect(
      lessonUiReducer(initialState, {
        type: ActionType.SetLanguage,
        language: Language.UK,
      })
    ).toEqual({
      ...initialState,
      language: Language.UK,
    })
  })

  it('handles ActionType.SetAudioVolume', () => {
    expect(
      lessonUiReducer(initialState, {
        type: ActionType.SetAudioVolume,
        audioVolume: 10,
      })
    ).toEqual({
      ...initialState,
      audioVolume: 10,
    })
  })

  it('handles ActionType.SetAudioAutoPlay', () => {
    expect(
      lessonUiReducer(initialState, {
        type: ActionType.SetAudioAutoPlay,
        audioAutoPlay: false,
      })
    ).toEqual({
      ...initialState,
      audioAutoPlay: false,
    })
  })
})
