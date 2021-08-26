import React from 'react'
import { Container, Heading } from '@chakra-ui/react'
import { NextLayoutPage } from 'next'
import LeaderboardTable from '@/modules/leaderboard/components/LeaderboardTable'
import Breadcrumb from '@/components/Breadcrumb'

const Leaderboard: NextLayoutPage = () => {
  return (
    <Container maxW="container.lg">
      <Breadcrumb
        items={{
          Home: '/',
          Leaderboard: '/leaderboard',
        }}
      />
      <Heading as="h2">Leaderboard</Heading>
      <LeaderboardTable />
    </Container>
  )
}

export default Leaderboard
