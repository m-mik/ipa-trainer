import { useInfiniteQuery } from 'react-query'
import axios, { AxiosError } from 'axios'
import { ResponseError } from '../types'

type Lesson = {
  id: string
  createdAt: Date
}

type QueryResult = {
  data: Lesson[]
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
