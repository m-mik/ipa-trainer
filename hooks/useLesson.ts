import { useQuery } from 'react-query'
import axios from 'axios'

function useLesson() {
  return useQuery(
    'lesson',
    () => axios.post('/api/lesson').then((res) => res.data),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  )
}

export default useLesson
