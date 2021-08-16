import {
  Box,
  HStack,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverProps,
  PopoverTrigger,
  Portal,
} from '@chakra-ui/react'
import { Language } from '@prisma/client'
import { HiInformationCircle } from 'react-icons/hi'
import Audio from './Audio'
import Flag from './Flag'
import useLessonUi from '../hooks/useLessonUi'

type WordPopoverProps = PopoverProps & {
  word: {
    name: string
    pronunciations: {
      id: string
      audio: string
      language: Language
      symbols?: string | undefined
    }[]
  }
}

function WordPopover({ word, ...rest }: WordPopoverProps) {
  const {
    state: { audioVolume },
  } = useLessonUi()

  return (
    <Popover trigger="hover" {...rest}>
      <PopoverTrigger>
        <Box d="inline">
          <Icon
            as={HiInformationCircle}
            color="blue.200"
            aria-label="Show pronunciations"
            cursor="pointer"
          />
        </Box>
      </PopoverTrigger>
      <Portal>
        <PopoverContent w="auto">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Pronunciations</PopoverHeader>
          <PopoverBody>
            {word.pronunciations.map(({ id, symbols, audio, language }) => (
              <HStack key={id} alignItems="center" spacing="4">
                <Box>
                  <Flag country={language} width="30px" height="30px" />
                </Box>
                <Box>{symbols}</Box>
                <Box>
                  <Audio src={audio} autoPlay={false} volume={audioVolume} />
                </Box>
              </HStack>
            ))}
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}

export default WordPopover
