import { AiFillSound } from 'react-icons/ai'
import { Box, BoxProps, IconButton } from '@chakra-ui/react'
import { useRef } from 'react'

type AudioProps = BoxProps & {
  src?: string
}

function Audio({ src, ...rest }: AudioProps) {
  const ref = useRef<HTMLAudioElement | null>(null)

  const handleClick = (e: React.MouseEvent) => {
    ref.current?.play()
  }

  if (!src) return null

  return (
    <Box {...rest}>
      <IconButton
        icon={<AiFillSound />}
        aria-label="Play audio"
        onClick={handleClick}
        size="sm"
        variant="ghost"
      />
      {<audio src={src} ref={ref} />}
    </Box>
  )
}

export default Audio
