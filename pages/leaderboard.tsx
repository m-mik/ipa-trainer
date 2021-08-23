import React from 'react'
import { Container, Heading } from '@chakra-ui/react'
import { NextLayoutPage } from 'next'
import LeaderboardTable from '@/modules/leaderboard/components/LeaderboardTable'

const Leaderboard: NextLayoutPage = () => {
  return (
    <Container maxW="container.lg">
      <Heading as="h2" mb="5">
        Leaderboard
      </Heading>
      <LeaderboardTable />
    </Container>
  )
}

export default Leaderboard
