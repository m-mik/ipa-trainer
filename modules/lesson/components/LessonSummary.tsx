import {
  Box,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Heading,
  Icon,
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
import useLessonQuery from '../hooks/useLessonQuery'
import AnswerIcon from './AnswerIcon'
import { CountUp } from 'use-count-up'
import { HiInformationCircle } from 'react-icons/hi'
import useColors from '@/common/hooks/useColors'

function LessonSummary(props: TableProps) {
  const { data } = useLessonQuery()

  const colors = {
    points: useColors('highlight'),
    heading: useColors('primary'),
    accuracyCircle: useColors('highlight'),
    accuracyCircleTrack: darken(useColors('highlight'), 30),
  }

  if (!data) return null
  const { questions } = data

  const answersCountByType = questions.reduce(
    (result, question) => {
      let count = result[question.answer] ?? 0
      return { ...result, [question.answer]: ++count }
    },
    { CORRECT: 0, INCORRECT: 0, NONE: 0 }
  )

  const { CORRECT } = answersCountByType
  const correctAnswersPercentage = Math.floor(
    (CORRECT / questions.length) * 100
  )

  const pointsEarned = CORRECT * 50

  const handleCountUpComplete = () => {}

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
                  <CountUp
                    isCounting
                    end={pointsEarned}
                    duration={3.2}
                    onComplete={handleCountUpComplete}
                  />
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
                  {word.name} <Icon as={HiInformationCircle} color="blue.200" />
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
