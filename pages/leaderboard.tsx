import { Container, Heading, Spinner } from '@chakra-ui/react'
import { NextLayoutPage } from 'next'
import useLeaderboard from '@/modules/leaderboard/hooks/useLeaderboard'
import { useRouter } from 'next/router'
import LeaderboardTable from '@/modules/leaderboard/components/LeaderboardTable'
import useColors from '@/common/hooks/useColors'

const Leaderboard: NextLayoutPage = () => {
  const router = useRouter()
  const page = Math.max(Number(router.query.page ?? 1), 1)
  const { isLoading } = useLeaderboard(page)

  return (
    <Container maxW="container.lg">
      <Heading as="h2" mb="5" color={useColors('primary')}>
        Leaderboard
      </Heading>
      {isLoading ? <Spinner /> : <LeaderboardTable />}
    </Container>
  )
}

export default Leaderboard
