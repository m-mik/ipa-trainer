import { createContext, Dispatch, ReactNode, Reducer, useReducer } from 'react'
import {
  initialState,
  lessonUiReducer,
  LessonUiState,
} from '../store/lessonUiReducer'
import { LessonUiAction } from '../store/lessonUiActions'

export const LessonUiContext = createContext<
  | {
      state: LessonUiState
      dispatch: Dispatch<LessonUiAction>
    }
  | undefined
>(undefined)

type LessonUiProviderProps = {
  children: ReactNode
}

export function LessonUiProvider({ children }: LessonUiProviderProps) {
  const [state, dispatch] = useReducer<Reducer<LessonUiState, LessonUiAction>>(
    lessonUiReducer,
    initialState
  )

  const value = { state, dispatch }
  return (
    <LessonUiContext.Provider value={value}>
      {children}
    </LessonUiContext.Provider>
  )
}
