import { useContext } from 'react'
import { LessonContext } from '@/modules/lesson/providers/LessonProvider'

function useLessonContext() {
  const context = useContext(LessonContext)
  if (typeof context === 'undefined') {
    throw new Error('useLesson must be used within a LessonProvider')
  }
  return context
}

export default useLessonContext
