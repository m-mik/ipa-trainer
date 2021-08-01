import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Flex, HStack, StackProps } from '@chakra-ui/react'
import { useCallback } from 'react'
import useColors from '@/hooks/useColors'

type Character = string

type CharacterPanelProps = {
  characters: Character[]
  onCharactersChange?: (newCharacters: Character[]) => void
  onCharacterClick?: (character: Character, index: number) => void
} & StackProps

function CharacterPanel({
  characters,
  onCharactersChange,
  onCharacterClick,
  ...rest
}: CharacterPanelProps) {
  const handleDragEnd = useCallback(
    (result) => {
      const { source, destination } = result
      if (!destination) return
      const newCharacters = [...characters]
      newCharacters.splice(source.index, 1)
      newCharacters.splice(destination.index, 0, characters[source.index])
      onCharactersChange?.(newCharacters)
    },
    [characters, onCharactersChange]
  )

  const characterBg = useColors('primary')
  const characterColor = useColors('bg')

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
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
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={(_) => onCharacterClick?.(character, index)}
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
