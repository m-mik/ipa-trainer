import { Container, Spinner, VStack } from '@chakra-ui/react'
import { NextLayoutPage } from 'next'
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
import withAuth from '@/hocs/withAuth'
import { Answer as AnswerType } from '@prisma/client'
import Breadcrumb from '../common/components/Breadcrumb'
import { NextSeo } from 'next-seo'

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
    <>
      <NextSeo
        title="Learn"
        description="Learn International Phonetic Alphabet"
      />
      <Container maxW="container.lg" p="2">
        <Breadcrumb
          items={{
            Home: '/',
            Learn: '/learn',
          }}
        />
        {isLoading ? (
          <Spinner />
        ) : data && activeQuestion ? (
          <>
            <LessonProgress questions={data.questions} />
            <Card>
              <VStack spacing="4" onContextMenu={(e) => e.preventDefault()}>
                <Question />
                <UserAnswer m="1em 0" />
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
    </>
  )
}

export default withAuth(Learn)
