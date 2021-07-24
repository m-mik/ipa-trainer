import { Container } from '@chakra-ui/react'
import { NextLayoutPage } from 'next'
import Hero from '@/components/Hero'

const Home: NextLayoutPage = () => {
  return (
    <Container maxW="container.lg">
      <Hero as="section" />
    </Container>
  )
}

export default Home
