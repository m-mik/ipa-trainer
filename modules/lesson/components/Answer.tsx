import {
  Box,
  HStack,
  StackProps,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import useLessonUi from '../hooks/useLessonUi'
import Symbol from '@/components/Symbol'
import useColors from '@/hooks/useColors'
import { symbolsToArray } from '../utils'

function Answer(props: StackProps) {
  const {
    state: { language, activeQuestion },
  } = useLessonUi()

  const colors = {
    bg: useColorModeValue('green.600', 'green.200'),
    fg: useColors('bg'),
  }

  if (!activeQuestion) return null

  return (
    <VStack {...props}>
      {activeQuestion.word.pronunciations
        .filter((pronunciation) => pronunciation.language === language)
        .map(({ symbols = '', id }) => (
          <HStack key={id} spacing="0">
            {symbolsToArray(symbols).map((symbol, index) => (
              <Symbol
                key={`${symbol}${index}`}
                name={symbol}
                bg={colors.bg}
                color={colors.fg}
              />
            ))}
            <Box w="50px" />
          </HStack>
        ))}
    </VStack>
  )
}

export default Answer
