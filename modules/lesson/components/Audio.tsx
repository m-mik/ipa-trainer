import { AiFillSound } from 'react-icons/ai'
import { Box, IconButton } from '@chakra-ui/react'
import { useRef } from 'react'

type AudioProps = React.HTMLProps<HTMLAudioElement> & {
  src?: string
}

function Audio({ src, ...rest }: AudioProps) {
  const ref = useRef<HTMLAudioElement | null>(null)

  const handleClick = (e: React.MouseEvent) => {
    ref.current?.play()
  }

  if (!src) return null

  return (
    <Box>
      <IconButton
        icon={<AiFillSound />}
        aria-label="Play audio"
        onClick={handleClick}
        size="sm"
        variant="ghost"
      />
      {<audio autoPlay src={src} ref={ref} {...rest} />}
    </Box>
  )
}

export default Audio
