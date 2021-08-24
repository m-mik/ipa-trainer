import axios, { AxiosError } from 'axios'
import { useQuery } from 'react-query'
import { UserWithPoints } from '@/common/types'
import { ResponseError } from '@/common/types'

async function fetchUserById(userId: string) {
  return axios
    .get<UserWithPoints>(`/api/user/${userId}`)
    .then((res) => res.data)
}

function useUser(userId: string) {
  return useQuery<UserWithPoints, AxiosError<ResponseError>>(
    ['user', userId],
    () => fetchUserById(userId),
    {
      refetchOnWindowFocus: false,
    }
  )
}

export default useUser
