import React from 'react'
import {
  Button,
  ButtonProps,
  Flex,
  StackProps,
  Tooltip,
  VStack,
} from '@chakra-ui/react'
import { useIsMutating } from 'react-query'
import { Language } from '@prisma/client'
import IPA, { Symbol } from '@/data/IPA'
import useLessonUi from '../hooks/useLessonUi'
import { ActionType } from '../store/lessonUiActions'
import SymbolTooltipLabel from './SymbolTooltipLabel'
import useKey from '@/common/hooks/useKey'
import { getAlphabetSymbols } from '../utils'

function Keyboard(props: StackProps) {
  const { state, dispatch } = useLessonUi()
  const { language, activeSymbolIndex, symbols } = state
  const isSavingQuestion = useIsMutating({ mutationKey: 'saveQuestion' }) > 0

  const handleClick = (symbol: Symbol) => {
    if (isSavingQuestion) return
    else if (activeSymbolIndex === null)
      dispatch({ type: ActionType.AppendSymbol, symbol })
    else {
      dispatch({
        type: ActionType.SetSymbol,
        payload: { index: activeSymbolIndex, symbol },
      })
      dispatch({ type: ActionType.ResetActiveSymbolIndex })
    }
  }

  const deleteSymbol = () => {
    if (isSavingQuestion) return
    else if (activeSymbolIndex !== null) {
      dispatch({ type: ActionType.RemoveSymbol, index: activeSymbolIndex })
    } else if (symbols.length) {
      dispatch({ type: ActionType.RemoveSymbol, index: symbols.length - 1 })
    }
    dispatch({ type: ActionType.ResetActiveSymbolIndex })
  }

  useKey('Backspace', deleteSymbol)

  const symbolKeys = SYMBOLS_BY_LANGUAGE[language]

  const additionalKeys = [
    { value: 'ˈ', label: 'main stress', handleClick },
    { value: ',', label: 'secondary stress', handleClick },
    { value: '.', label: 'syllable division', handleClick },
    { value: '🗑', label: 'delete symbol', handleClick: deleteSymbol },
  ]

  return (
    <VStack spacing="2" p="2" d="inline-flex" {...props}>
      <Flex justifyContent="center" wrap="wrap" draggable="false">
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

export const SYMBOLS_BY_LANGUAGE: {
  [key in Language]: Symbol[]
} = {
  [Language.US]: getAlphabetSymbols(IPA, Language.US),
  [Language.UK]: getAlphabetSymbols(IPA, Language.UK),
}

export default Keyboard
