import { useContext } from 'react'
import { LessonContext } from '../providers/LessonProvider'

function useLesson() {
  const lessonContext = useContext(LessonContext)
  if (typeof lessonContext === 'undefined') {
    throw new Error('useLesson must be used within a LessonProvider')
  }
  return lessonContext
}

export default useLesson
