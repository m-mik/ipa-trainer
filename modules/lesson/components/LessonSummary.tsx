import {
  Box,
  Text,
  CircularProgress,
  CircularProgressLabel,
  Heading,
  Stack,
  Table,
  TableProps,
  Icon,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react'
import { Answer } from '@prisma/client'
import useLessonQuery from '../hooks/useLessonQuery'
import AnswerIcon from './AnswerIcon'
import useColors from '@/common/hooks/useColors'
import { HiInformationCircle } from 'react-icons/hi'

function LessonSummary(props: TableProps) {
  const { data } = useLessonQuery()

  const colors = {
    points: useColors('highlight'),
    heading: useColors('primary'),
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

  return (
    <Stack>
      <VStack spacing="5">
        <Box>
          <Heading as="h2" color={colors.heading}>
            {pointsEarned === 0 ? (
              'Better luck next time!'
            ) : (
              <>
                You&apos;ve earned{' '}
                <Text as="span" color={colors.points}>
                  {pointsEarned}
                </Text>{' '}
                points!
              </>
            )}
          </Heading>
        </Box>
        <Box>
          <CircularProgress
            value={correctAnswersPercentage}
            size="100px"
            color="green"
          >
            <CircularProgressLabel>
              {correctAnswersPercentage}%
            </CircularProgressLabel>
          </CircularProgress>
        </Box>
      </VStack>
      <Box>
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
    </Stack>
  )
}

export default LessonSummary
