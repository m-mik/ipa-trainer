import { createContext, useReducer, Dispatch, Reducer, ReactNode } from 'react'
import {
  initialState,
  lessonReducer,
  LessonState,
} from '../store/lessonReducer'
import { LessonAction } from '../store/lessonActions'

export const LessonContext = createContext<
  | {
      state: LessonState
      dispatch: Dispatch<LessonAction>
    }
  | undefined
>(undefined)

type LessonProviderProps = {
  children: ReactNode
}

export function LessonProvider({ children }: LessonProviderProps) {
  const [state, dispatch] = useReducer<Reducer<LessonState, LessonAction>>(
    lessonReducer,
    initialState
  )
  const value = { state, dispatch }
  return (
    <LessonContext.Provider value={value}>{children}</LessonContext.Provider>
  )
}
