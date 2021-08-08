import useLessonQuery from '../hooks/useLessonQuery'
import useLesson from '../hooks/useLesson'
import Audio from './Audio'
import { Box, HStack, Tag, Text } from '@chakra-ui/react'

type QuestionPanelProps = {}

function QuestionPanel(props: QuestionPanelProps) {
  const {
    state: { activeQuestion, language },
  } = useLesson()
  const { isLoading, data } = useLessonQuery()

  if (!activeQuestion) return null

  const audio = activeQuestion.word.pronunciations.find(
    (pronunciation) => pronunciation.language === language
  )?.audio

  return (
    <HStack alignItems="center" spacing="2">
      <Box>
        <Text fontSize="4xl" as="span">
          {activeQuestion.word.name}
        </Text>
      </Box>
      <Box>
        <Tag size="sm">{activeQuestion.word.partOfSpeech}</Tag>
      </Box>
      <Box>
        <Audio src={audio} />
      </Box>
    </HStack>
  )
}

export default QuestionPanel
