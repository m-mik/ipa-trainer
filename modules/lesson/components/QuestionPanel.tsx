import useLesson from '../hooks/useLesson'
import Audio from './Audio'
import { Box, HStack, Tag, Text } from '@chakra-ui/react'
import LanguageControl from './LanguageControl'
import React from 'react'
import { Language } from '@prisma/client'
import { ActionType } from '../store/lessonActions'
import { useIsMutating } from 'react-query'

type QuestionPanelProps = {}

function QuestionPanel(props: QuestionPanelProps) {
  const {
    dispatch,
    state: { activeQuestion, language },
  } = useLesson()
  const isSavingQuestion = useIsMutating({ mutationKey: 'saveQuestion' }) > 0

  if (!activeQuestion) return null

  const audio = activeQuestion.word.pronunciations.find(
    (pronunciation) => pronunciation.language === language
  )?.audio

  const handleLanguageChange = (language: Language) => {
    if (isSavingQuestion) return
    dispatch({ type: ActionType.ResetActiveSymbolIndex })
    dispatch({ type: ActionType.SetLanguage, language })
    dispatch({ type: ActionType.ResetSymbols })
  }

  return (
    <>
      <HStack alignItems="center" spacing="2">
        <Box>
          <Text fontSize="4xl" as="span">
            {activeQuestion.word.name}
          </Text>
        </Box>
        <Box>
          <Tag size="sm">{activeQuestion.word.partOfSpeech}</Tag>
        </Box>
        <Audio src={audio} />
        <LanguageControl
          ml="auto"
          selectedLanguage={language}
          onLanguageChange={handleLanguageChange}
        />
      </HStack>
    </>
  )
}

export default QuestionPanel
