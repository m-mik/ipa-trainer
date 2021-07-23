import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'

function Card(props: BoxProps) {
  return (
    <Box
      bg={useColorModeValue('white', 'brand.700')}
      py="8"
      px={{ base: '4', md: '10' }}
      shadow="base"
      rounded={{ sm: 'lg' }}
      {...props}
    />
  )
}

export default Card
