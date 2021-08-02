import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd'
import { Box, Flex, HStack, StackProps } from '@chakra-ui/react'
import useColors from '@/hooks/useColors'

type Character = string

type CharacterPanelProps = {
  characters: Character[]
  activeCharIndex: number | null
  onCharacterClick?: (character: Character, index: number) => void
  onCharacterRightClick?: (character: Character, index: number) => void
  onCharacterDrop?: (result: DropResult) => void
} & StackProps

function CharacterPanel({
  characters,
  activeCharIndex,
  onCharacterClick,
  onCharacterRightClick,
  onCharacterDrop,
  ...rest
}: CharacterPanelProps) {
  const characterBg = useColors('primary')
  const characterColor = useColors('bg')
  const activeBorderColor = useColors('highlight')

  const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement>,
    character: Character,
    index: number
  ) => {
    e.preventDefault()
    onCharacterRightClick?.(character, index)
  }

  return (
    <DragDropContext onDragEnd={(result) => onCharacterDrop?.(result)}>
      <Droppable droppableId="characters" direction="horizontal">
        {(provided, snapshot) => (
          <HStack
            ref={provided.innerRef}
            {...provided.droppableProps}
            {...rest}
          >
            {characters.map((character, index) => (
              <Draggable
                key={`${character}${index}`}
                draggableId={`${character}${index}`}
                index={index}
              >
                {(provided) => (
                  <Flex
                    border={index === activeCharIndex ? '3px solid' : ''}
                    borderColor={activeBorderColor}
                    bg={characterBg}
                    color={characterColor}
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
                    aria-label="Select character"
                    onClick={(_) => onCharacterClick?.(character, index)}
                    onContextMenu={(e) =>
                      handleContextMenu(e, character, index)
                    }
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {character}
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

export default CharacterPanel
