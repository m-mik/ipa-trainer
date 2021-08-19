import { Symbol } from '@/data/IPA'
import { Answer, Language } from '@prisma/client'
import { LessonWithPronunciations } from '@/common/types/LessonWithPronunciations'
import { QuestionWithPronunciations } from '@/common/types/QuestionWithPronunciations'

export enum ActionType {
  Initialize = 'INITIALIZE',
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
  SetAudioVolume = 'SET_AUDIO_VOLUME',
  SetAudioAutoPlay = 'SET_AUDIO_AUTO_PLAY',
}

export const activateNextQuestion = (
  lessonWithPronunciations: LessonWithPronunciations
) => {
  const firstQuestionWithoutAnswer =
    lessonWithPronunciations?.questions.find(
      (question: QuestionWithPronunciations) => question.answer === Answer.NONE
    ) ?? null

  return {
    type: ActionType.SetActiveQuestion,
    question: firstQuestionWithoutAnswer,
  } as const
}

export type LessonUiAction =
  | { type: ActionType.Initialize }
  | { type: ActionType.SetLanguage; language: Language }
  | { type: ActionType.SetAudioVolume; audioVolume: number }
  | { type: ActionType.SetAudioAutoPlay; audioAutoPlay: boolean }
  | { type: ActionType.AppendSymbol; symbol: Symbol }
  | { type: ActionType.AddSymbol; payload: { symbol: Symbol; index: number } }
  | { type: ActionType.RemoveSymbol; index: number }
  | { type: ActionType.SetSymbol; payload: { index: number; symbol: Symbol } }
  | { type: ActionType.ResetSymbols }
  | { type: ActionType.ResetActiveSymbolIndex }
  | { type: ActionType.SetActiveSymbolIndex; index: number | null }
  | {
      type: ActionType.SetActiveQuestion
      question: QuestionWithPronunciations | null
    }
  | {
      type: ActionType.DropSymbol
      payload: { sourceIndex: number; destinationIndex: number }
    }
