import { Box, Container, Spinner, VStack } from '@chakra-ui/react'
import { NextLayoutPage } from 'next'
import React from 'react'
import dynamic from 'next/dynamic'
import useLesson from '@/modules/lesson/hooks/useLesson'
import KeyboardPanel from '@/modules/lesson/components/KeyboardPanel'
import QuestionPanel from '@/modules/lesson/components/QuestionPanel'
import useLessonQuery from '@/modules/lesson/hooks/useLessonQuery'
import LessonProgress from '@/modules/lesson/components/LessonProgress'
import LessonSummary from '@/modules/lesson/components/LessonSummary'
import Card from '@/components/Card'

const AnswerPanel = dynamic(
  () => import('@/modules/lesson/components/AnswerPanel'),
  {
    ssr: false,
  }
)

const Learn: NextLayoutPage = () => {
  const {
    state: { activeQuestion },
  } = useLesson()
  const { isLoading, data } = useLessonQuery()

  return (
    <Container maxW="container.lg">
      {isLoading ? (
        <Spinner />
      ) : data && activeQuestion ? (
        <>
          <LessonProgress questions={data.questions} />
          <Card>
            <VStack spacing="4" onContextMenu={(e) => e.preventDefault()}>
              <QuestionPanel />
              <AnswerPanel />
              <KeyboardPanel />
            </VStack>
          </Card>
        </>
      ) : (
        <LessonSummary />
      )}
    </Container>
  )
}

export default Learn
