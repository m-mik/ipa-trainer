import {
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Heading,
  Table,
  TableProps,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react'
import { darken } from '@chakra-ui/theme-tools'
import useLesson from '../hooks/useLesson'
import AnswerIcon from './AnswerIcon'
import { CountUp } from 'use-count-up'
import { LessonStatus } from '@prisma/client'
import useColors from '@/common/hooks/useColors'
import useSession from '@/common/hooks/useSession'
import { getAnswerCountByType } from '../utils'
import WordPopover from './WordPopover'
import { useQueryClient } from 'react-query'
import useSaveLesson from '../hooks/useSaveLesson'
import { useEffect } from 'react'

function LessonSummary(props: TableProps) {
  const [session, loading, refetchSession] = useSession()
  const { mutate: saveLesson } = useSaveLesson()
  const queryClient = useQueryClient()
  const { data } = useLesson()

  useEffect(() => {
    if (data?.status == LessonStatus.ACTIVE) {
      saveLesson({
        lessonId: data.id,
        data: {
          status: LessonStatus.COMPLETED,
        },
      })
      refetchSession()
    }
  }, [data, saveLesson])

  const colors = {
    points: useColors('highlight'),
    heading: useColors('primary'),
    accuracyCircle: useColors('highlight'),
    accuracyCircleTrack: darken(useColors('highlight'), 30),
  }

  if (!data) return null
  const { questions } = data

  const { CORRECT } = getAnswerCountByType(questions)
  const correctAnswersPercentage = Math.floor(
    (CORRECT / questions.length) * 100
  )

  const pointsEarned = CORRECT * 50

  return (
    <VStack spacing="8">
      <Box>
        <Heading as="h2" color={colors.heading}>
          {pointsEarned === 0 ? (
            'Better luck next time!'
          ) : (
            <>
              <Text textAlign="center">
                You&apos;ve earned{' '}
                <Text as="span" color={colors.points}>
                  <CountUp isCounting end={pointsEarned} duration={3.2} />
                </Text>{' '}
                points!
              </Text>
            </>
          )}
        </Heading>
      </Box>
      <Box textAlign="center">
        <CircularProgress
          value={correctAnswersPercentage}
          size="100px"
          // @ts-ignore
          trackColor={colors.accuracyCircleTrack}
          color={colors.accuracyCircle}
        >
          <CircularProgressLabel>
            {correctAnswersPercentage}%
          </CircularProgressLabel>
        </CircularProgress>
        <Text fontSize="1.5em">Accuracy</Text>
      </Box>
      <Box>
        <Button
          variant="outline"
          onClick={() => queryClient.invalidateQueries('lesson')}
        >
          Try Again
        </Button>
      </Box>
      <Box w="100%">
        <Table variant="striped" {...props}>
          <Thead>
            <Tr>
              <Th>Word</Th>
              <Th>Part Of Speech</Th>
              <Th>Answer</Th>
            </Tr>
          </Thead>
          <Tbody>
            {questions.map(({ id, answer, word }) => (
              <Tr key={id}>
                <Td>
                  {word.name} <WordPopover word={word} />
                </Td>
                <Td>{word.partOfSpeech.toLowerCase()}</Td>
                <Td>
                  <AnswerIcon type={answer} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </VStack>
  )
}

export default LessonSummary
