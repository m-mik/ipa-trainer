import { Box, Button, Flex, FlexProps, HStack, Spacer } from '@chakra-ui/react'
import Link from '@/components/Link'
import Logo from '@/components/Logo'
import NavBar from '@/components/NavBar'

function Header(props: FlexProps) {
  return (
    <Flex as="header" {...props} minH="100">
      <Box>
        <Link href="/" chakraProps={{ _hover: { textDecoration: 'none' } }}>
          <Logo />
        </Link>
      </Box>
      <Spacer />
      <NavBar />
    </Flex>
  )
}

export default Header
