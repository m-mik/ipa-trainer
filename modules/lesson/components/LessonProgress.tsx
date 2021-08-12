import { Box, chakra, HStack, useColorModeValue } from '@chakra-ui/react'
import { Answer, Question } from '@prisma/client'
import useColors from '@/common/hooks/useColors'
import { motion } from 'framer-motion'
import { getAnswerCountByType } from '../utils'

const MotionBox = motion(chakra.div)

type LessonProgressProps = {
  questions: {
    id: Question['id']
    answer: Answer
  }[]
}

function LessonProgress({ questions }: LessonProgressProps) {
  const bgColor = {
    [Answer.NONE]: useColors('primary'),
    [Answer.CORRECT]: useColorModeValue('green.600', 'green.400'),
    [Answer.INCORRECT]: useColorModeValue('red.600', 'red.400'),
  }

  const { CORRECT, INCORRECT } = getAnswerCountByType(questions)
  const answeredQuestionsPercentage = Math.floor(
    ((CORRECT + INCORRECT) / questions.length) * 100
  )

  return (
    <HStack w="100%" spacing="0" bg={useColors('primary')}>
      <MotionBox
        initial={{ width: 0 }}
        animate={{ width: `${answeredQuestionsPercentage}%` }}
        transition={{ duration: 1 }}
        d="flex"
        flexDirection="row"
        bg={useColors('highlight')}
        h="1"
      />
    </HStack>
  )
}

export default LessonProgress
