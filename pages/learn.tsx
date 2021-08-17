import { Container, Spinner, VStack } from '@chakra-ui/react'
import { NextLayoutPage } from 'next'
import React from 'react'
import dynamic from 'next/dynamic'
import Error from '@/components/Error'
import useLessonUi from '@/modules/lesson/hooks/useLessonUi'
import Keyboard from '@/modules/lesson/components/Keyboard'
import Question from '@/modules/lesson/components/Question'
import useLesson from '@/modules/lesson/hooks/useLesson'
import LessonProgress from '@/modules/lesson/components/LessonProgress'
import LessonSummary from '@/modules/lesson/components/LessonSummary'
import Card from '@/components/Card'
import Answer from '@/modules/lesson/components/Answer'
import withAuth from '@/common/hocs/withAuth'
import { Answer as AnswerType } from '@prisma/client'

const UserAnswer = dynamic(
  () => import('@/modules/lesson/components/UserAnswer'),
  {
    ssr: false,
  }
)

const Learn: NextLayoutPage = () => {
  const {
    state: { activeQuestion },
  } = useLessonUi()
  const { isLoading, data, error } = useLesson()

  if (error?.response) {
    return <Error statusCode={error.response.data.code} />
  }

  return (
    <Container maxW="container.lg">
      {isLoading ? (
        <Spinner />
      ) : data && activeQuestion ? (
        <>
          <LessonProgress questions={data.questions} />
          <Card>
            <VStack spacing="4" onContextMenu={(e) => e.preventDefault()}>
              <Question />
              <UserAnswer />
              {activeQuestion?.answer === AnswerType.NONE ? (
                <Keyboard />
              ) : (
                <Answer />
              )}
            </VStack>
          </Card>
        </>
      ) : (
        <LessonSummary />
      )}
    </Container>
  )
}

export default withAuth(Learn)
