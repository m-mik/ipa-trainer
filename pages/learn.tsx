import { Container } from '@chakra-ui/react'
import { NextLayoutPage } from 'next'
import useLesson from '@/hooks/useLesson'
import Keyboard from '@/components/Keyboard'
import IpaLangControl from '@/components/IpaLangControl'

const Learn: NextLayoutPage = () => {
  const lesson = useLesson()

  return (
    <Container maxW="container.lg">
      <IpaLangControl />
      <Keyboard />
    </Container>
  )
}

export default Learn
