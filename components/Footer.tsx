import { Box, BoxProps } from '@chakra-ui/react'

function Footer(props: BoxProps) {
  return (
    <Box as="footer" bg="red" {...props}>
      Footer
    </Box>
  )
}

export default Footer
