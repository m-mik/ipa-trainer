import { useMutation } from 'react-query'
import { signIn } from 'next-auth/client'
import { Credentials } from '../types/Credentials'
import useSession from '@/common/hooks/useSession'

function useSignIn() {
  const [session, loading, refetchSession] = useSession()

  return useMutation(
    async ({ username, password }: Credentials) => {
      const res = await signIn('credentials', {
        redirect: false,
        username,
        password,
      })
      if (!res?.ok) throw new Error('Wrong username or password')
      return true
    },
    {
      onSuccess() {
        refetchSession()
      },
    }
  )
}

export default useSignIn
