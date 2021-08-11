import {
  Text,
  Box,
  StackProps,
  VStack,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react'
import React from 'react'
import { Answer as AnswerType } from '@prisma/client'
import useLesson from '../hooks/useLesson'
import AnswerIcon from './AnswerIcon'
import { MdCheckCircle } from 'react-icons/md'

function Answer(props: StackProps) {
  const {
    state: { language, activeQuestion },
  } = useLesson()

  if (!activeQuestion) return null

  return (
    <VStack {...props}>
      <List spacing={3}>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.400" />
          {activeQuestion.word.pronunciations
            .filter((pronunciation) => pronunciation.language === language)
            .map((pronunciation) => (
              <Text
                as="span"
                color="green.400"
                fontSize="3xl"
                key={pronunciation.id}
              >
                {pronunciation.symbols}
              </Text>
            ))}
        </ListItem>
      </List>
    </VStack>
  )
}

export default Answer
