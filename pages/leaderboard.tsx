import { Container, Spinner } from '@chakra-ui/react'
import { NextLayoutPage } from 'next'

const Leaderboard: NextLayoutPage = () => {
  return (
    <Container maxW="container.lg">
      <Spinner />
    </Container>
  )
}

export default Leaderboard
