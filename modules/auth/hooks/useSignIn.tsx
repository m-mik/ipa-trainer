import { useMutation } from 'react-query'
import { signIn } from 'next-auth/client'
import { Credentials } from '@/pages/api/auth/[...nextauth]'

function useSignIn() {
  return useMutation(async ({ username, password }: Credentials) => {
    const res = await signIn('credentials', {
      redirect: false,
      username,
      password,
    })
    if (!res || !res.ok) throw new Error('Wrong username or password')
    return true
  })
}

export default useSignIn
