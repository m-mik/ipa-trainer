import { Center, Container } from '@chakra-ui/react'
import { NextLayoutPage } from 'next'
import useLesson from '@/hooks/useLesson'
import IpaKeyboard from '@/components/IpaKeyboard'

const Learn: NextLayoutPage = () => {
  const lesson = useLesson()

  return (
    <Container maxW="container.lg">
      <Center>
        <IpaKeyboard />
      </Center>
    </Container>
  )
}

export default Learn
