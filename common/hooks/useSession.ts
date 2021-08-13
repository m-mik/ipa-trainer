import { useQuery } from 'react-query'
import { getSession } from 'next-auth/client'
import { Session } from 'next-auth'

function useSession() {
  const query = useQuery<Session | null>('session', () => getSession(), {
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  })
  return [query.data, query.isLoading, query.refetch] as const
}

export default useSession
