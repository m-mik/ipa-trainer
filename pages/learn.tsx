import { Container, Spinner, VStack } from '@chakra-ui/react'
import { NextLayoutPage } from 'next'
import React from 'react'
import dynamic from 'next/dynamic'
import useLesson from '../modules/lesson/hooks/useLesson'
import KeyboardPanel from '@/modules/lesson/components/KeyboardPanel'
import { LessonProvider } from '@/modules/lesson/providers/LessonProvider'
import Card from '@/components/Card'

const SymbolPanel = dynamic(
  () => import('@/modules/lesson/components/SymbolPanel'),
  {
    ssr: false,
  }
)

const Learn: NextLayoutPage = () => {
  const { isLoading, data } = useLesson()

  return (
    <LessonProvider>
      <Container maxW="container.lg">
        <Card>
          <VStack onContextMenu={(e) => e.preventDefault()}>
            {isLoading && <Spinner />}
            <SymbolPanel />
            <KeyboardPanel />
          </VStack>
        </Card>
      </Container>
    </LessonProvider>
  )
}

export default Learn
