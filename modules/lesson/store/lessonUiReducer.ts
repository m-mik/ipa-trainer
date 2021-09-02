import { addToArray, removeByIndex, updateByIndex } from '@/utils/array'
import { Symbol } from '@/data/IPA'
import { Language } from '@prisma/client'
import { ActionType, LessonUiAction } from './lessonUiActions'
import { QuestionWithPronunciations } from '@/common/types'

export type LessonUiState = Readonly<{
  symbols: Symbol[]
  activeSymbolIndex: number | null
  activeQuestion: QuestionWithPronunciations | null
  language: Language
  audioVolume: number
  audioAutoPlay: boolean
  isInitialized: boolean
}>

export const initialState: LessonUiState = {
  symbols: [],
  activeSymbolIndex: null,
  activeQuestion: null,
  language: Language.US,
  audioVolume: 0.5,
  audioAutoPlay: true,
  isInitialized: false,
}

export function lessonUiReducer(state: LessonUiState, action: LessonUiAction) {
  switch (action.type) {
    case ActionType.Initialize: {
      return { ...state, isInitialized: true }
    }
    case ActionType.SetAudioVolume: {
      return { ...state, audioVolume: action.audioVolume }
    }
    case ActionType.SetAudioAutoPlay: {
      return { ...state, audioAutoPlay: action.audioAutoPlay }
    }
    case ActionType.SetLanguage: {
      return { ...state, language: action.language }
    }
    case ActionType.SetActiveQuestion: {
      return { ...state, activeQuestion: action.question }
    }
    case ActionType.SetActiveSymbolIndex: {
      return { ...state, activeSymbolIndex: action.index }
    }
    case ActionType.ResetActiveSymbolIndex: {
      return { ...state, activeSymbolIndex: initialState.activeSymbolIndex }
    }
    case ActionType.AppendSymbol: {
      return {
        ...state,
        symbols: addToArray(state.symbols, action.symbol),
      }
    }
    case ActionType.RemoveSymbol: {
      return {
        ...state,
        symbols: removeByIndex(state.symbols, action.index),
      }
    }
    case ActionType.SetSymbol: {
      const { index, symbol } = action.payload
      return {
        ...state,
        symbols: updateByIndex(state.symbols, index, symbol),
      }
    }
    case ActionType.ResetSymbols: {
      return { ...state, symbols: [] }
    }
    case ActionType.DropSymbol: {
      const { sourceIndex, destinationIndex } = action.payload
      const newSymbols = [...state.symbols]
      newSymbols.splice(sourceIndex, 1)
      newSymbols.splice(destinationIndex, 0, state.symbols[sourceIndex])
      return { ...state, symbols: newSymbols }
    }
    case ActionType.ResetActiveQuestion: {
      return { ...state, activeQuestion: null }
    }
    default:
      return state
  }
}
