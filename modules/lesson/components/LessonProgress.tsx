import { chakra, HStack } from '@chakra-ui/react'
import { Answer, Question } from '@prisma/client'
import { motion } from 'framer-motion'
import useColors from '@/hooks/useColors'
import { getAnswerCountByType } from '../utils'

const MotionBox = motion(chakra.div)

type LessonProgressProps = {
  questions: {
    id: Question['id']
    answer: Answer
  }[]
}

function LessonProgress({ questions }: LessonProgressProps) {
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
