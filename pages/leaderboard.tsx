import React from 'react'
import { Container, Heading, Spinner } from '@chakra-ui/react'
import { NextLayoutPage } from 'next'
import { useRouter } from 'next/router'
import useLeaderboard from '@/modules/leaderboard/hooks/useLeaderboard'
import LeaderboardTable from '@/modules/leaderboard/components/LeaderboardTable'
import Error from '@/components/Error'

const Leaderboard: NextLayoutPage = () => {
  const router = useRouter()
  const page = Math.max(Number(router.query.page ?? 1), 1)
  const { isLoading, error } = useLeaderboard(page)

  if (error?.response) {
    return <Error statusCode={error.response.data.code} />
  }

  return (
    <Container maxW="container.lg">
      <Heading as="h2" mb="5">
        Leaderboard
      </Heading>
      {isLoading ? <Spinner /> : <LeaderboardTable />}
    </Container>
  )
}

export default Leaderboard
