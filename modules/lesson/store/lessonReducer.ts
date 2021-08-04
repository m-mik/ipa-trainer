import { addToArray, removeByIndex, updateByIndex } from '@/utils/array'
import { Language, Symbol } from '@/common/data/IPA'
import { ActionType, LessonAction } from './lessonActions'

export interface LessonState {
  symbols: Symbol[]
  activeSymbolIndex: number | null
  language: Language
}

export const initialState: LessonState = {
  symbols: [
    { id: 1, name: 'a' },
    { id: 2, name: 'b' },
    { id: 3, name: 'c' },
    { id: 4, name: 'd' },
    { id: 5, name: 'e' },
  ],
  activeSymbolIndex: null,
  language: 'us',
}

export function lessonReducer(state: LessonState, action: LessonAction) {
  switch (action.type) {
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