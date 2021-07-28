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

  const renderUserMenu = () => {
    if (!session || !session.user) return null
    const { name, image, points } = session.user
    return <UserMenu name={name} imageUrl={image ?? ''} points={points} />
  }

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
          <Box>
            <ButtonGroup
              {...props}
              variant="link"
              spacing="5"
              d="flex"
              alignItems="center"
            >
              <ColorModeSwitch />
              <Link href="/leaderboard">
                <Button>Leaderboard</Button>
              </Link>
              <Link href="/learn">
                <Button>Learn</Button>
              </Link>
              {loading && <Spinner />}
              {renderUserMenu()}
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
