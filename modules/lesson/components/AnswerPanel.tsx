import React, { useCallback } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import {
  Box,
  Center,
  HStack,
  IconButton,
  StackProps,
  useOutsideClick,
} from '@chakra-ui/react'
import useColors from '@/common/hooks/useColors'
import useKey from '@/common/hooks/useKey'
import { Symbol } from '@/data/IPA'
import useLesson from '../hooks/useLesson'
import { ActionType } from '../store/lessonActions'
import { AiOutlineSend } from 'react-icons/ai'

const AnswerPanel = function SymbolPanel(props: StackProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { state, dispatch } = useLesson()
  const { symbols, activeSymbolIndex } = state
  const colors = {
    symbolBg: useColors('primary'),
    symbol: useColors('bg'),
    border: useColors('secondary'),
    activeBorder: useColors('highlight'),
  }

  const sendAnswer = () => {
    if (!symbols.length) return
    console.log('send answer')
  }

  useKey('Enter', sendAnswer)

  useOutsideClick({
    ref,
    handler: (_) =>
      setTimeout(
        () => dispatch({ type: ActionType.ResetActiveSymbolIndex }),
        0
      ),
  })

  const handleSymbolRightClick = (symbol: Symbol, index: number) => {
    dispatch({ type: ActionType.RemoveSymbol, index })
    const active = activeSymbolIndex
    if (active === null) return
    else if (active === index)
      dispatch({ type: ActionType.ResetActiveSymbolIndex })
    else if (index < active)
      dispatch({ type: ActionType.SetActiveSymbolIndex, index: active - 1 })
  }

  const handleSymbolClick = (symbol: Symbol, index: number) => {
    if (activeSymbolIndex === index) {
      dispatch({ type: ActionType.ResetActiveSymbolIndex })
    } else {
      dispatch({ type: ActionType.SetActiveSymbolIndex, index })
    }
  }

  const handleSymbolDrop = useCallback(
    ({ source, destination }) => {
      if (!destination || source.index === destination.index) return
      dispatch({
        type: ActionType.SetActiveSymbolIndex,
        index: calculateSymbolDropActiveIndex({
          active: activeSymbolIndex,
          source: source.index,
          destination: destination.index,
        }),
      })
      dispatch({
        type: ActionType.DropSymbol,
        payload: {
          sourceIndex: source.index,
          destinationIndex: destination.index,
        },
      })
    },
    [activeSymbolIndex, dispatch]
  )

  const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement>,
    symbol: Symbol,
    index: number
  ) => {
    e.preventDefault()
    handleSymbolRightClick(symbol, index)
  }

  return (
    <DragDropContext onDragEnd={handleSymbolDrop}>
      <Droppable droppableId="symbols" direction="horizontal">
        {(provided) => (
          <Box ref={ref}>
            <HStack
              wrap="wrap"
              justifyContent="center"
              ref={provided.innerRef}
              spacing="0"
              {...provided.droppableProps}
              {...props}
            >
              {symbols.map((symbol, index) => (
                <Draggable
                  key={`${symbol.name}-${index}`}
                  draggableId={String(index)}
                  index={index}
                >
                  {(provided) => (
                    <Center
                      border={
                        index === activeSymbolIndex ? '3px solid' : '1px solid'
                      }
                      borderColor={
                        index === activeSymbolIndex
                          ? colors.activeBorder
                          : colors.border
                      }
                      bg={colors.symbolBg}
                      color={colors.symbol}
                      w="50px"
                      h="50px"
                      fontSize="2.5em"
                      userSelect="none"
                      _hover={{ cursor: 'move', fontSize: '2.8em' }}
                      ref={provided.innerRef}
                      aria-label="Select symbol"
                      onClick={(_) => handleSymbolClick(symbol, index)}
                      onContextMenu={(e) => handleContextMenu(e, symbol, index)}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {symbol.name}
                    </Center>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              {symbols.length && (
                <Box pl="2">
                  <IconButton
                    variant="outline"
                    aria-label="Send answer"
                    icon={<AiOutlineSend />}
                    onClick={sendAnswer}
                  />
                </Box>
              )}
            </HStack>
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  )
}

type calculateSymbolDropActiveIndexProps = {
  active: number | null
  source: number
  destination: number
}

export function calculateSymbolDropActiveIndex({
  active,
  source,
  destination,
}: calculateSymbolDropActiveIndexProps) {
  if (active === null) return active
  else if (source < active && destination < active) return active
  else if (source > active && destination > active) return active
  else if (source === active) return destination
  else if (source > active) return active + 1
  else if (source < active) return active - 1
  else return active
}

export default AnswerPanel
