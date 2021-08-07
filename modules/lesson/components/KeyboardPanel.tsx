import React from 'react'
import {
  Button,
  ButtonProps,
  Flex,
  HStack,
  StackProps,
  Tooltip,
  VStack,
} from '@chakra-ui/react'
import { Language } from '@prisma/client'
import IPA, { Alphabet, Symbol } from '@/data/IPA'
import useLessonContext from '../hooks/useLesssonContext'
import { ActionType } from '../store/lessonActions'
import SymbolTooltipLabel from './SymbolTooltipLabel'
import LanguageControl from './LanguageControl'
import useKey from '@/common/hooks/useKey'

function KeyboardPanel(props: StackProps) {
  const { state, dispatch } = useLessonContext()
  const { language, activeSymbolIndex, symbols } = state

  const handleClick = (symbol: Symbol) => {
    if (activeSymbolIndex === null)
      dispatch({ type: ActionType.AppendSymbol, symbol })
    else {
      dispatch({
        type: ActionType.SetSymbol,
        payload: { index: activeSymbolIndex, symbol },
      })
      dispatch({ type: ActionType.ResetActiveSymbolIndex })
    }
  }

  const handleLanguageChange = (language: Language) => {
    dispatch({ type: ActionType.ResetActiveSymbolIndex })
    dispatch({ type: ActionType.SetLanguage, language })
    dispatch({ type: ActionType.ResetSymbols })
  }

  const deleteSymbol = () => {
    if (activeSymbolIndex !== null) {
      dispatch({ type: ActionType.RemoveSymbol, index: activeSymbolIndex })
    } else if (symbols.length) {
      dispatch({ type: ActionType.RemoveSymbol, index: symbols.length - 1 })
    }
    dispatch({ type: ActionType.ResetActiveSymbolIndex })
  }

  useKey('Backspace', deleteSymbol)

  const symbolKeys = SYMBOLS_BY_LANGUAGE[language]

  const additionalKeys = [
    { value: "'", label: 'main stress', handleClick },
    { value: ',', label: 'secondary stress', handleClick },
    { value: '.', label: 'syllable division', handleClick },
    { value: '🗑', label: 'delete symbol', handleClick: deleteSymbol },
  ]

  return (
    <VStack spacing="2" p="2" d="inline-flex" {...props}>
      <HStack width="100%">
        <LanguageControl
          ml="auto"
          selectedLanguage={language}
          onLanguageChange={handleLanguageChange}
        />
      </HStack>
      <Flex justifyContent="center" wrap="wrap">
        {symbolKeys.map((symbol) => (
          <Tooltip
            key={symbol.id}
            label={
              symbol.example && <SymbolTooltipLabel text={symbol.example} />
            }
            aria-label="Example word"
          >
            <Key data={symbol} onClick={handleClick} />
          </Tooltip>
        ))}
        {additionalKeys.map(({ value, label, handleClick }) => (
          <Tooltip key={value} label={label} aria-label={label}>
            <Key data={{ name: value }} onClick={handleClick} />
          </Tooltip>
        ))}
      </Flex>
    </VStack>
  )
}

type KeyProps = Omit<ButtonProps, 'onClick'> & {
  data: {
    name: string
  }
  onClick?: (value: any) => void
}

const Key = React.forwardRef<HTMLButtonElement, KeyProps>(
  ({ onClick, data, ...rest }, ref) => (
    <Button
      m="1"
      variant="outline"
      px="0"
      py="0"
      fontSize="2em"
      ref={ref}
      onClick={() => onClick?.(data)}
      {...rest}
    >
      {data.name}
    </Button>
  )
)

Key.displayName = 'Key'

export function getAlphabetSymbols(alphabet: Alphabet, language?: Language) {
  const isUniversalSymbol = (symbol: Symbol) =>
    typeof symbol.language === 'undefined'
  const { vowels, consonants, diphthongs, other } = alphabet
  const symbols = [
    ...vowels.long,
    ...vowels.short,
    ...consonants.voiced,
    ...consonants.voiceless,
    ...diphthongs,
    ...other,
  ] as Symbol[]
  return language
    ? symbols.filter(
        (symbol) => isUniversalSymbol(symbol) || symbol.language === language
      )
    : symbols
}

export const SYMBOLS_BY_LANGUAGE: {
  [key in Language]: Symbol[]
} = {
  [Language.US]: getAlphabetSymbols(IPA, Language.US),
  [Language.UK]: getAlphabetSymbols(IPA, Language.UK),
}

export default KeyboardPanel
