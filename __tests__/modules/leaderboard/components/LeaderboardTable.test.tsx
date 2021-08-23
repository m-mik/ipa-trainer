import { mockNextUseRouter, render, screen } from 'test-utils'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import LeaderboardTable from '@/modules/leaderboard/components/LeaderboardTable'

const server = setupServer(
  rest.get('/api/leaderboard', (req, res, ctx) => {
    const page = parseInt(req.url.searchParams.get('page') ?? '1')
    const pages = [
      {
        users: [
          {
            id: 'ckshvayua0242zu9hmgjssjsm',
            name: 'user1',
            image: 'https://avatars.githubusercontent.com/u/25752752?v=4',
            points: 450,
          },
          {
            id: 'cksz1jcci0007oq9hj94egx3z',
            name: 'user2',
            image: null,
            points: 100,
          },
        ],
        hasMore: true,
      },
      {
        users: [
          {
            id: 'cksbvayua0242zu9hmgjsshs3',
            name: 'user3',
            image: 'https://avatars.githubusercontent.com/u/25752752?v=4',
            points: 50,
          },
          {
            id: 'cksj1jcci0007oq9hj94egg3v',
            name: 'user4',
            image: null,
            points: 0,
          },
        ],
        hasMore: false,
      },
    ]
    return res(ctx.json(pages[page - 1]))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

it('renders Loading and LeaderboardTable', async () => {
  mockNextUseRouter({
    pathname: '/leaderboard',
    query: { page: 1 },
  })
  render(<LeaderboardTable />)
  expect(screen.getByText('Loading...'))
  expect(await screen.findByRole('table'))
})

describe('pagination', () => {
  for (let page = 1; page <= 2; page++) {
    it(`returns the correct data for page ${page}`, async () => {
      mockNextUseRouter({
        pathname: '/leaderboard',
        query: { page },
      })
      render(<LeaderboardTable />)
      expect(await screen.findByText(`user${page * 2}`))
      expect(await screen.findByRole('group')).toHaveTextContent(String(page))
    })
  }
})

it('disables Previous button when there is no previous data', async () => {
  mockNextUseRouter({
    pathname: '/leaderboard',
    query: { page: 1 },
  })
  render(<LeaderboardTable />)
  expect(
    await screen.findByRole('button', { name: 'Previous' })
  ).toHaveAttribute('disabled')
  expect(
    await screen.findByRole('button', { name: 'Next' })
  ).not.toHaveAttribute('disabled')
})

it('disables Next button when no more data is available', async () => {
  mockNextUseRouter({
    pathname: '/leaderboard',
    query: { page: 2 },
  })
  render(<LeaderboardTable />)
  expect(
    await screen.findByRole('button', { name: 'Previous' })
  ).not.toHaveAttribute('disabled')
  expect(await screen.findByRole('button', { name: 'Next' })).toHaveAttribute(
    'disabled'
  )
})

it('handles server error', async () => {
  mockNextUseRouter({
    pathname: '/leaderboard',
    query: { page: 3 },
  })
  server.use(
    rest.get('/api/leaderboard', (req, res, ctx) => {
      return res(
        ctx.status(500),
        ctx.json({ message: 'Internal Server Error', code: 500 })
      )
    })
  )
  render(<LeaderboardTable />)
  expect(await screen.findByRole('heading', { name: 'Something Went Wrong' }))
})
