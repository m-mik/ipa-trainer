import { Symbol } from '@/data/IPA'
import { Language } from '@prisma/client'
import { ActiveQuestion } from '../types/ActiveQuestion'

export enum ActionType {
  AppendSymbol = 'APPEND_SYMBOL',
  AddSymbol = 'ADD_SYMBOL',
  RemoveSymbol = 'REMOVE_SYMBOL',
  SetSymbol = 'SET_SYMBOL',
  ResetSymbols = 'RESET_SYMBOLS',
  SetActiveSymbolIndex = 'SET_ACTIVE_SYMBOL_INDEX',
  ResetActiveSymbolIndex = 'RESET_ACTIVE_SYMBOL_INDEX',
  SetActiveQuestion = 'SET_ACTIVE_QUESTION',
  DropSymbol = 'DROP_SYMBOL',
  SetLanguage = 'SET_LANGUAGE',
}

export type LessonAction =
  | { type: ActionType.SetLanguage; language: Language }
  | { type: ActionType.AppendSymbol; symbol: Symbol }
  | { type: ActionType.AddSymbol; payload: { symbol: Symbol; index: number } }
  | { type: ActionType.RemoveSymbol; index: number }
  | { type: ActionType.SetSymbol; payload: { index: number; symbol: Symbol } }
  | { type: ActionType.ResetSymbols }
  | { type: ActionType.ResetActiveSymbolIndex }
  | { type: ActionType.SetActiveSymbolIndex; index: number | null }
  | { type: ActionType.SetActiveQuestion; question: ActiveQuestion }
  | {
      type: ActionType.DropSymbol
      payload: { sourceIndex: number; destinationIndex: number }
    }
