import { Symbol } from '../../../common/data/IPA'

export enum ActionType {
  AppendSymbol = 'APPEND_SYMBOL',
  AddSymbol = 'ADD_SYMBOL',
  RemoveSymbol = 'REMOVE_SYMBOL',
  SetSymbol = 'SET_SYMBOL',
  ResetSymbols = 'RESET_SYMBOLS',
  SetActiveSymbolIndex = 'SET_ACTIVE_SYMBOL_INDEX',
  ResetActiveSymbolIndex = 'RESET_ACTIVE_SYMBOL_INDEX',
  DropSymbol = 'DROP_SYMBOL',
}

export type LessonAction =
  | { type: ActionType.AppendSymbol; symbol: Symbol }
  | { type: ActionType.AddSymbol; payload: { symbol: Symbol; index: number } }
  | { type: ActionType.RemoveSymbol; index: number }
  | { type: ActionType.SetSymbol; payload: { index: number; symbol: Symbol } }
  | { type: ActionType.ResetSymbols }
  | { type: ActionType.ResetActiveSymbolIndex }
  | { type: ActionType.SetActiveSymbolIndex; index: number | null }
  | {
      type: ActionType.DropSymbol
      payload: { sourceIndex: number; destinationIndex: number }
    }
