import { createContext, useReducer } from 'react'
import {
  initialState,
  lessonReducer,
  LessonState,
} from '../store/lessonReducer'
import { LessonAction } from '../store/lessonActions'

export const LessonContext = createContext<
  | {
      state: LessonState
      dispatch: React.Dispatch<LessonAction>
    }
  | undefined
>(undefined)

type LessonProviderProps = {
  children: React.ReactNode
}

export function LessonProvider({ children }: LessonProviderProps) {
  const [state, dispatch] = useReducer<
    React.Reducer<LessonState, LessonAction>
  >(lessonReducer, initialState)
  const value = { state, dispatch }
  return (
    <LessonContext.Provider value={value}>{children}</LessonContext.Provider>
  )
}
