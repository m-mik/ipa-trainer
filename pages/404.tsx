import { Container } from '@chakra-ui/react'
import { NextLayoutPage } from 'next'
import Error from '@/components/Error'
import React from 'react'

const NotFound: NextLayoutPage = () => {
  return (
    <Container maxW="container.lg" mb="5em">
      <Error statusCode={404} />
    </Container>
  )
}

export default NotFound
