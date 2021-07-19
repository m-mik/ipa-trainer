import { Box, BoxProps } from '@chakra-ui/react'

function Sidebar(props: BoxProps) {
  return (
    <Box as="aside" {...props}>
      Sidebar
    </Box>
  )
}

export default Sidebar
