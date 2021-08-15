import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import { useEffect } from 'react'

export type LeaderboardResponseData = {
  users: Array<{
    id: string
    name: string
    points: number
  }>
  hasMore: boolean
}

async function fetchLeaderboard(page: number) {
  return axios.get(`/api/leaderboard?page=${page}`).then((res) => res.data)
}

function useLeaderboard(page: number) {
  const queryClient = useQueryClient()
  const query = useQuery<LeaderboardResponseData>(
    ['leaderboard', page],
    () => fetchLeaderboard(page),
    {
      keepPreviousData: true,
      staleTime: 5000,
      refetchOnWindowFocus: false,
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
