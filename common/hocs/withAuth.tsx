import { useRouter } from 'next/router'
import useSession from '../hooks/useSession'

function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function WrappedComponentWithAuth(props: P) {
    const router = useRouter()
    const [session, loading] = useSession()

    if (typeof window === 'undefined' || loading) return null

    if (!session?.user) {
      router.replace('/auth/sign-in')
      return null
    }

    return <Component {...props} />
  }
}

export default withAuth
