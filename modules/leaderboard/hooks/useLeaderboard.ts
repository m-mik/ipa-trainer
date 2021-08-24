import { useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import axios, { AxiosError } from 'axios'
import { UserWithPoints } from '@/common/types'
import { ResponseError } from '@/common/types'

async function fetchLeaderboard(page: number) {
  return axios.get(`/api/leaderboard?page=${page}`).then((res) => res.data)
}

type QueryResult = {
  users: UserWithPoints[]
  hasMore: boolean
}

function useLeaderboard(page: number) {
  const queryClient = useQueryClient()
  const query = useQuery<QueryResult, AxiosError<ResponseError>>(
    ['leaderboard', page],
    () => fetchLeaderboard(page),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60,
    }
  )

  useEffect(() => {
    if (query.data?.hasMore) {
      queryClient.prefetchQuery(['leaderboard', page + 1], () =>
        fetchLeaderboard(page + 1)
      )
    }
  }, [query.data, page, queryClient])

  return query
}

export default useLeaderboard
