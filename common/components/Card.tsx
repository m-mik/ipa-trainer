import { Box, BoxProps } from '@chakra-ui/react'
import * as React from 'react'
import useColors from '@/common/hooks/useColors'

function Card(props: BoxProps) {
  return (
    <Box
      bg={useColors('secondary')}
      py="8"
      px={{ base: '4', md: '10' }}
      shadow="base"
      rounded={{ sm: 'lg' }}
      {...props}
    />
  )
}

export default Card
