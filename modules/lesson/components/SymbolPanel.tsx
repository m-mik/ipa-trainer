import { useCallback } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Flex, HStack, StackProps } from '@chakra-ui/react'
import useColors from '@/common/hooks/useColors'
import { Symbol } from '@/common/data/IPA'
import useLessonContext from '../hooks/useLesssonContext'
import { ActionType } from '../store/lessonActions'

function SymbolPanel(props: StackProps) {
  const { state, dispatch } = useLessonContext()
  const { symbols, activeSymbolIndex } = state
  const colors = {
    symbolBg: useColors('primary'),
    symbol: useColors('bg'),
    activeBorder: useColors('highlight'),
  }

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
          <HStack
            ref={provided.innerRef}
            {...provided.droppableProps}
            {...props}
          >
            {symbols.map((symbol, index) => (
              <Draggable
                key={`${symbol.name}-${index}`}
                draggableId={String(symbol.id)}
                index={index}
              >
                {(provided) => (
                  <Flex
                    border={index === activeSymbolIndex ? '3px solid' : ''}
                    borderColor={colors.activeBorder}
                    bg={colors.symbolBg}
                    color={colors.symbol}
                    w="50px"
                    h="50px"
                    px="0"
                    py="0"
                    justifyContent="center"
                    alignItems="center"
                    fontSize="2.5em"
                    userSelect="none"
                    _hover={{ cursor: 'move' }}
                    ref={provided.innerRef}
                    aria-label="Select symbol"
                    onClick={(_) => handleSymbolClick(symbol, index)}
                    onContextMenu={(e) => handleContextMenu(e, symbol, index)}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {symbol.name}
                  </Flex>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </HStack>
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

export default SymbolPanel