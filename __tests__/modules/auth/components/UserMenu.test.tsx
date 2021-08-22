import UserMenu from '@/modules/auth/components/UserMenu'
import { mockNextUseRouter, render, screen } from 'test-utils'
import useSession from '@/hooks/useSession'

mockNextUseRouter({
  pathname: '/',
})

jest.mock('@/hooks/useSession')

it('renders loading spinner when the session is loading', () => {
  ;(useSession as jest.Mock).mockReturnValueOnce([undefined, true])
  render(<UserMenu />)
  const loading = screen.getByText('Loading...')
  expect(loading).toBeInTheDocument()
})

it('renders Sign In button when the user is not signed in', () => {
  const mockSession = {}
  ;(useSession as jest.Mock).mockReturnValueOnce([mockSession, false])
  render(<UserMenu />)
  const signInButton = screen.getByRole('button', { name: /Sign In/i })
  expect(signInButton).toBeInTheDocument()
})

it('renders username when the user is signed in', () => {
  const mockSession = {
    user: {
      id: 'cksf1jcci0007oq9hj94egx3z',
      points: 100,
      name: 'demo',
      image: null,
    },
    expires: '2021-09-21T19:48:55.876Z',
  }

  ;(useSession as jest.Mock).mockReturnValueOnce([mockSession, false])
  render(<UserMenu />)
  const username = screen.getByText('demo')
  expect(username).toBeInTheDocument()
})
