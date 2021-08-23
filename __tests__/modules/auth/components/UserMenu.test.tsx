import UserMenu from '@/modules/auth/components/UserMenu'
import {
  fireEvent,
  mockNextUseRouter,
  render,
  screen,
  waitFor,
} from 'test-utils'
import useSession from '@/hooks/useSession'

mockNextUseRouter({
  pathname: '/',
})

jest.mock('@/hooks/useSession')

const mockedUseSession = useSession as jest.Mock

const pendingSession = undefined
const notSignedInSession = {}
const signedInSession = {
  user: {
    id: 'cksf1jcci0007oq9hj94egx3z',
    points: 100,
    name: 'demo',
    image: null,
  },
  expires: '2021-09-21T19:48:55.876Z',
}

it('renders loading Spinner when the session is loading', () => {
  mockedUseSession.mockReturnValueOnce([pendingSession, true])
  render(<UserMenu />)
  const loading = screen.getByText('Loading...')
  expect(loading).toBeInTheDocument()
})

it('renders Sign In button when the user is not signed in', () => {
  mockedUseSession.mockReturnValueOnce([notSignedInSession, false])
  render(<UserMenu />)
  const signInButton = screen.getByRole('button', { name: /Sign In/i })
  expect(signInButton).toBeInTheDocument()
})

it('renders username when the user is signed in', () => {
  mockedUseSession.mockReturnValueOnce([signedInSession, false])
  render(<UserMenu />)
  const username = screen.getByText('demo')
  expect(username).toBeInTheDocument()
})

it('opens UserMenu when MenuButton is clicked', async () => {
  mockedUseSession.mockReturnValueOnce([signedInSession, false])
  render(<UserMenu />)
  expect(screen.queryByRole('button', { expanded: true })).toBeFalsy()
  fireEvent.click(screen.getByRole('button', { expanded: false }))
  await waitFor(() =>
    expect(screen.queryByRole('button', { expanded: true })).toBeTruthy()
  )
})
