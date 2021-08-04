import { Box, BoxProps, Container, HStack } from '@chakra-ui/react'
import Link from '@/common/components/Link'
import Logo from '@/common/components/Logo'
import useColors from '@/common/hooks/useColors'
import Navbar from './Navbar'

function Header(props: BoxProps) {
  return (
    <Box
      as="header"
      bg={useColors('bg')}
      position="sticky"
      top="0"
      zIndex="1"
      {...props}
    >
      <Container maxW="container.lg">
        <HStack
          justifyContent="space-between"
          alignItems="center"
          height="70px"
        >
          <Link
            styleActive={false}
            _hover={{ textDecoration: 'none' }}
            href="/"
          >
            <Logo justifyContent="space-between" alignItems="center" />
          </Link>
          <Navbar />
        </HStack>
      </Container>
    </Box>
  )
}

export default Header
