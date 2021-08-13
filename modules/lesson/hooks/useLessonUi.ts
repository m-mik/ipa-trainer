import { useContext } from 'react'
import { LessonUiContext } from '../providers/LessonUiProvider'

function useLessonUi() {
  const lessonUiContext = useContext(LessonUiContext)
  if (typeof lessonUiContext === 'undefined') {
    throw new Error('useLessonUi must be used within a LessonUiProvider')
  }
  return lessonUiContext
}

export default useLessonUi
