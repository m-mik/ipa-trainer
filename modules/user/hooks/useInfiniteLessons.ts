import { useInfiniteQuery } from 'react-query'
import axios, { AxiosError } from 'axios'
import { LessonWithAnswersCount } from '@/common/types'
import { ResponseError } from '@/common/types'

type QueryResult = {
  data: LessonWithAnswersCount[]
  previous: number
  next: number
}

function useInfiniteLessons(userId: string) {
  return useInfiniteQuery<QueryResult, AxiosError<ResponseError>>(
    ['lessons', userId],
    ({ pageParam = 1 }) =>
      axios
        .get<QueryResult>(`/api/lesson?userId=${userId}&page=${pageParam}`)
        .then((res) => res.data),
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) => lastPage.next ?? false,
    }
  )
}

export default useInfiniteLessons
