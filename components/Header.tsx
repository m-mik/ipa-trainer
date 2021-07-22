import { Box, Flex, FlexProps, Spacer } from '@chakra-ui/react'
import Link from '@/components/Link'
import Logo from '@/components/Logo'

function Header(props: FlexProps) {
  return (
    <>
      <Flex as="header" {...props} minH="100">
        <Box>
          <Link href="/" _hover={{ textDecoration: 'none' }}>
            <Logo />
          </Link>
        </Box>
        <Spacer />
      </Flex>
    </>
  )
}

export default Header
