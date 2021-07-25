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
    const name = session.user.name ?? ''
    const image = session.user.image ?? ''

    return <UserMenu name={name} imageUrl={image} />
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
          <Link _hover={{ textDecoration: 'none' }} href="/">
            <Logo justifyContent="space-between" alignItems="center" />
          </Link>
          <Box as="nav">
            <ButtonGroup {...props} variant="link" spacing="5">
              <ColorModeSwitch />
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
