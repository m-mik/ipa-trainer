import { useQuery } from 'react-query'
import axios, { AxiosError } from 'axios'
import { ResponseError, Stats } from '@/common/types'

function fetchStats(): Promise<Stats> {
  return axios.get<Stats>('/api/stats').then((res) => res.data)
}

function useStats() {
  return useQuery<Stats, AxiosError<ResponseError>>('stats', fetchStats, {
    staleTime: 1000 * 60,
  })
}

export default useStats
