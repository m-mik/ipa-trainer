import React from 'react'
import { Container } from '@chakra-ui/react'
import { NextPageContext } from 'next'
import ErrorComponent from '@/components/Error'

type ErrorProps = {
  statusCode: number
}

function Error({ statusCode }: ErrorProps) {
  return (
    <Container maxW="container.lg" mb="5em">
      <ErrorComponent statusCode={statusCode} />
    </Container>
  )
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return {
    statusCode,
  }
}

export default Error
