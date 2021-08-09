import { Box, HStack } from '@chakra-ui/react'
import { Answer, Question } from '@prisma/client'

type LessonProgressProps = {
  questions: {
    id: Question['id']
    answer: Answer
  }[]
}

function LessonProgress({ questions }: LessonProgressProps) {
  const bgColor = {
    [Answer.NONE]: 'gray',
    [Answer.CORRECT]: 'green',
    [Answer.INCORRECT]: 'red',
  }

  return (
    <HStack w="100%" spacing="0">
      {questions.map((question) => (
        <Box
          textAlign="center"
          w="100%"
          h="2"
          bg={bgColor[question.answer]}
          key={question.id}
        />
      ))}
    </HStack>
  )
}

export default LessonProgress
