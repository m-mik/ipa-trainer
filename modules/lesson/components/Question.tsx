import useLessonUi from '../hooks/useLessonUi'
import Audio from './Audio'
import { Box, HStack, StackProps, Tag, Text } from '@chakra-ui/react'
import LanguageControl from './LanguageControl'
import { Answer, Language } from '@prisma/client'
import { ActionType } from '../store/lessonUiActions'
import { useIsMutating } from 'react-query'

function Question(props: StackProps) {
  const {
    dispatch,
    state: { activeQuestion, language, audioVolume, audioAutoPlay },
  } = useLessonUi()
  const isSavingQuestion = useIsMutating({ mutationKey: 'saveQuestion' }) > 0

  if (!activeQuestion) return null

  const audio = activeQuestion.word.pronunciations.find(
    (pronunciation) => pronunciation.language === language
  )?.audio

  const handleLanguageChange = (language: Language) => {
    if (isSavingQuestion || activeQuestion.answer !== Answer.NONE) return
    dispatch({ type: ActionType.ResetActiveSymbolIndex })
    dispatch({ type: ActionType.SetLanguage, language })
    dispatch({ type: ActionType.ResetSymbols })
  }

  return (
    <>
      <HStack alignItems="center" spacing="2" {...props}>
        <Box>
          <Text fontSize="4xl" as="span">
            {activeQuestion.word.name}
          </Text>
        </Box>
        <Box>
          <Tag size="sm">{activeQuestion.word.partOfSpeech}</Tag>
        </Box>
        <Audio src={audio} volume={audioVolume} autoPlay={audioAutoPlay} />
        <LanguageControl
          ml="auto"
          selectedLanguage={language}
          onLanguageChange={handleLanguageChange}
        />
      </HStack>
      <Text fontSize="sm">{activeQuestion.word.definition}</Text>
    </>
  )
}

export default Question
