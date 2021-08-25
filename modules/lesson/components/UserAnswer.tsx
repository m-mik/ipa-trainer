import React, { useCallback } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import {
  Box,
  chakra,
  HStack,
  Icon,
  IconButton,
  StackProps,
  useColorModeValue,
  useOutsideClick,
} from '@chakra-ui/react'
import useColors from '@/hooks/useColors'
import useKey from '@/hooks/useKey'
import { motion } from 'framer-motion'
import { AiOutlineSend } from 'react-icons/ai'
import { Answer } from '@prisma/client'
import { Symbol as SymbolType } from '@/data/IPA'
import { ActionType, activateNextQuestion } from '../store/lessonUiActions'
import useLessonUi from '../hooks/useLessonUi'
import { FaArrowDown } from 'react-icons/fa'
import useSaveQuestion from '../hooks/useSaveQuestion'
import useLesson from '../hooks/useLesson'
import Symbol from './Symbol'

const MotionBox = motion(chakra.div)

const UserAnswer = function SymbolPanel(props: StackProps) {
  const { mutate: saveQuestion, isLoading: isSavingQuestion } =
    useSaveQuestion()
  const { state, dispatch } = useLessonUi()
  const { data } = useLesson()
  const { symbols, activeSymbolIndex, activeQuestion, language } = state
  const ref = React.useRef<HTMLDivElement>(null)

  const colors = {
    symbol: useColors('bg'),
    symbolBg: {
      [Answer.NONE]: useColors('primary'),
      [Answer.CORRECT]: useColorModeValue('green.600', 'green.200'),
      [Answer.INCORRECT]: useColorModeValue('red.600', 'red.200'),
    },
    border: useColors('secondary'),
    activeBorder: useColors('highlight'),
    arrow: useColors('fg'),
  }

  const sendAnswer = () => {
    if (!activeQuestion || !symbols.length || isSavingQuestion) return
    saveQuestion({
      questionId: activeQuestion.id,
      data: {
        symbols: symbols.map((symbol) => symbol.name).join(''),
        language,
      },
    })
  }

  const confirm = () => {
    if (activeQuestion?.answer === Answer.NONE) {
      sendAnswer()
    } else if (data) {
      dispatch({ type: ActionType.ResetSymbols })
      dispatch(activateNextQuestion(data))
    }
  }

  useKey('Enter', (e) => {
    confirm()
    e.preventDefault()
  })

  useOutsideClick({
    ref,
    handler: (_) =>
      setTimeout(
        () => dispatch({ type: ActionType.ResetActiveSymbolIndex }),
        0
      ),
  })

  const handleSymbolRightClick = (symbol: SymbolType, index: number) => {
    if (activeQuestion?.answer !== Answer.NONE) return
    dispatch({ type: ActionType.RemoveSymbol, index })
    const active = activeSymbolIndex
    if (active === null) return
    else if (active === index)
      dispatch({ type: ActionType.ResetActiveSymbolIndex })
    else if (index < active)
      dispatch({ type: ActionType.SetActiveSymbolIndex, index: active - 1 })
  }

  const handleSymbolClick = (symbol: SymbolType, index: number) => {
    if (isSavingQuestion) return
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
    symbol: SymbolType,
    index: number
  ) => {
    if (isSavingQuestion) return
    e.preventDefault()
    handleSymbolRightClick(symbol, index)
  }

  if (!activeQuestion) return null

  return (
    <Box minH="85px">
      {!symbols.length ? (
        <MotionBox
          h="80px"
          d="flex"
          alignItems="center"
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          <Icon as={FaArrowDown} w="5" h="5" color={colors.arrow} />
        </MotionBox>
      ) : (
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
                      isDragDisabled={isSavingQuestion}
                      key={`${symbol.name}-${index}`}
                      draggableId={String(index)}
                      index={index}
                    >
                      {(provided) => (
                        <Symbol
                          name={symbol.name}
                          border={
                            index === activeSymbolIndex
                              ? '3px solid'
                              : '1px solid'
                          }
                          borderColor={
                            index === activeSymbolIndex
                              ? colors.activeBorder
                              : colors.border
                          }
                          bg={
                            colors.symbolBg[
                              activeQuestion?.answer ?? Answer.NONE
                            ]
                          }
                          color={colors.symbol}
                          _hover={{ cursor: 'move', fontSize: '2.8em' }}
                          ref={provided.innerRef}
                          aria-label="Select symbol"
                          onClick={(_) => handleSymbolClick(symbol, index)}
                          onContextMenu={(e) =>
                            handleContextMenu(e, symbol, index)
                          }
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  {symbols.length && (
                    <Box pl="2">
                      <IconButton
                        variant="outline"
                        aria-label="Confirm"
                        icon={<AiOutlineSend />}
                        isLoading={isSavingQuestion}
                        onClick={confirm}
                      />
                    </Box>
                  )}
                </HStack>
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </Box>
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

export default UserAnswer
