import { addToArray, removeByIndex, updateByIndex } from '@/utils/array'
import { Symbol } from '@/data/IPA'
import { Language } from '@prisma/client'
import { ActionType, LessonAction } from './lessonActions'
import { ActiveQuestion } from '../types/ActiveQuestion'

export type LessonState = Readonly<{
  symbols: Symbol[]
  activeSymbolIndex: number | null
  activeQuestion: ActiveQuestion | null
  language: Language
}>

export const initialState: LessonState = {
  symbols: [],
  activeSymbolIndex: null,
  activeQuestion: null,
  language: Language.US,
}

export function lessonReducer(state: LessonState, action: LessonAction) {
  switch (action.type) {
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
    case ActionType.AddSymbol: {
      return {
        ...state,
        symbols: addToArray(state.symbols, action.payload),
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
    default:
      return state
  }
}
