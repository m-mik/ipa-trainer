import {
  Box,
  Button,
  ButtonProps,
  Flex,
  StackProps,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react'
import IPA, { Alphabet, Language, Symbol } from '@/common/data/IPA'
import useColors from '@/common/hooks/useColors'
import useLessonContext from '../hooks/useLesssonContext'
import { ActionType } from '../store/lessonActions'
import SymbolTooltipLabel from './SymbolTooltipLabel'
import React from 'react'

function KeyboardPanel(props: StackProps) {
  const { state, dispatch } = useLessonContext()
  const { language, activeSymbolIndex, symbols } = state
  const symbolsForActiveLanguage = SYMBOLS_BY_LANGUAGE[language]

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

  const handleDeleteClick = () => {
    if (activeSymbolIndex !== null) {
      dispatch({ type: ActionType.RemoveSymbol, index: activeSymbolIndex })
    } else if (symbols.length) {
      dispatch({ type: ActionType.RemoveSymbol, index: symbols.length - 1 })
    }
    dispatch({ type: ActionType.ResetActiveSymbolIndex })
  }
  /*

  const handleLangChange = (lang: Language) => {
    setLang(lang)
    setActiveCharIndex(null)
    setCharacters([])
  }

  const keyRowsWithDelete = useMemo(() => {
    const deleteCharKey = { name: DELETE_KEY }
    return [[...keyRows[0], deleteCharKey]]
  }, [keyRows])
*/

  return (
    <VStack p="2" bg={useColors('secondary')} d="inline-flex" {...props}>
      <VStack spacing="2">
        <Flex justifyContent="center" wrap="wrap">
          {symbolsForActiveLanguage.map((symbol, index) => {
            return (
              <Tooltip
                key={symbol.id}
                label={
                  symbol.example && <SymbolTooltipLabel text={symbol.example} />
                }
                aria-label="Example word"
              >
                <Key data={symbol} onClick={handleClick} />
              </Tooltip>
            )
          })}
          <Key data={{ name: '🗑' }} onClick={handleDeleteClick} />
        </Flex>
      </VStack>
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

export function filterSymbols(symbols: Symbol[], language: Language) {
  const isUniversalSymbol = (symbol: Symbol) =>
    typeof symbol.language === 'undefined'
  return symbols.filter(
    (symbol) => isUniversalSymbol(symbol) || symbol.language === language
  ) as Symbol[]
}

export const SYMBOLS_BY_LANGUAGE: {
  [key in Language]: Symbol[]
} = {
  us: getAlphabetSymbols(IPA, 'us'),
  uk: getAlphabetSymbols(IPA, 'uk'),
}

export default KeyboardPanel
