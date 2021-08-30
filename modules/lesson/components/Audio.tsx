import { AiFillSound } from 'react-icons/ai'
import { Box, chakra, IconButton } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'

type AudioProps = React.HTMLProps<HTMLAudioElement> & {
  src?: string
  volume?: number
}

function Audio({ src, volume = 0.5, ...rest }: AudioProps) {
  const ref = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.volume = volume
    }
  }, [volume])

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
      {
        <audio
          autoPlay
          src={src}
          ref={ref}
          style={{ display: 'none' }}
          {...rest}
        />
      }
    </Box>
  )
}

export default Audio
