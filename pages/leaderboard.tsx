import { Container, Heading } from '@chakra-ui/react'
import { NextLayoutPage } from 'next'
import LeaderboardTable from '@/modules/leaderboard/components/LeaderboardTable'
import Breadcrumb from '@/components/Breadcrumb'
import { NextSeo } from 'next-seo'

const Leaderboard: NextLayoutPage = () => {
  return (
    <>
      <NextSeo
        title="Leaderboard"
        description="Ranking of users with the most points"
      />
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
    </>
  )
}

export default Leaderboard
