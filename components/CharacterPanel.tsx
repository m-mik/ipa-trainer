import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Box, HStack } from '@chakra-ui/react'
import { useCallback } from 'react'

type CharacterPanelProps = {
  characters: string[]
  onCharactersChange?: (
    newCharacters: CharacterPanelProps['characters']
  ) => void
}

function CharacterPanel({
  characters,
  onCharactersChange,
}: CharacterPanelProps) {
  const handleDragEnd = useCallback(({ source, destination }) => {
    console.log({ source, destination })
    if (!destination) return
    const newCharacters = [...characters]
    newCharacters[source.index] = characters[destination.index]
    newCharacters[destination.index] = characters[source.index]
    onCharactersChange?.(newCharacters)
  }, [])

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="characters" direction="horizontal">
        {(provided, snapshot) => (
          <HStack ref={provided.innerRef} {...provided.droppableProps}>
            {characters.map((character, index) => (
              <Draggable
                key={`${character}${index}`}
                draggableId={`${character}${index}`}
                index={index}
              >
                {(provided) => (
                  <Box
                    w="50px"
                    h="50px"
                    bg="blue"
                    //userSelect="none"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {character}
                  </Box>
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
