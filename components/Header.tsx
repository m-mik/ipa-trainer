import {
  Box,
  BoxProps,
  Button,
  ButtonGroup,
  Container,
  HStack,
  Spinner,
} from '@chakra-ui/react'
import { useSession } from 'next-auth/client'
import Link from '@/components/Link'
import Logo from '@/components/Logo'
import ColorModeSwitch from '@/components/ColorModeSwitch'
import UserMenu from '@/components/UserMenu'
import useColors from '@/hooks/useColors'

function Header(props: BoxProps) {
  const [session, loading] = useSession()
  const username = session?.user?.name ? session.user.name : ''

  return (
    <Box
      as="header"
      bg={useColors('bg')}
      position="sticky"
      top="0"
      zIndex="1"
      {...props}
    >
      <Container maxW="container.lg" height="70px">
        <HStack justifyContent="space-between" alignItems="center">
          <Box>
            <Link _hover={{ textDecoration: 'none' }} href="/">
              <Logo justifyContent="space-between" alignItems="center" />
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
