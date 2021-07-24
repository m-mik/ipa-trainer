import { Box, BoxProps } from '@chakra-ui/react'
import * as React from 'react'
import useColors from '@/hooks/useColors'

function Card(props: BoxProps) {
  return (
    <Box
      bg={useColors('bg')}
      py="8"
      px={{ base: '4', md: '10' }}
      shadow="base"
      rounded={{ sm: 'lg' }}
      {...props}
    />
  )
}

export default Card
