import {
  Box,
  Button,
  ButtonGroup,
  CenterProps,
  Container,
  HStack,
  Spinner,
  useColorModeValue,
} from '@chakra-ui/react'
import { useSession } from 'next-auth/client'
import Link from '@/components/Link'
import Logo from '@/components/Logo'
import ColorModeSwitch from '@/components/ColorModeSwitch'
import UserMenu from '@/components/UserMenu'
import colors from '@/theme/colors'

function Header(props: CenterProps) {
  const [session, loading] = useSession()
  const username = session?.user?.name ? session.user.name : ''

  return (
    <Box
      bg={useColorModeValue(colors.light, colors.dark)}
      as="header"
      position="sticky"
      top="0"
      {...props}
    >
      <Container maxW="container.lg" h="70px">
        <HStack
          justifyContent="space-between"
          alignItems="center"
          height="100%"
        >
          <Box>
            <Link href="/" _hover={{ textDecoration: 'none' }}>
              <Logo />
            </Link>
            <ColorModeSwitch />
          </Box>
          <Box as="nav">
            <ButtonGroup {...props} variant="link">
              {loading && <Spinner />}
              {session && <UserMenu username={username} />}
              {!loading && !session && (
                <Link href="/auth/sign-in">
                  <Button>Sign In</Button>
                </Link>
              )}
            </ButtonGroup>
          </Box>
        </HStack>
      </Container>
    </Box>
  )
}

export default Header
