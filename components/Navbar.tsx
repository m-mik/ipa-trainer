import {
  Box,
  Button,
  ButtonGroup,
  ButtonGroupProps,
  Spinner,
} from '@chakra-ui/react'
import { useSession } from 'next-auth/client'
import UserMenu from '@/components/UserMenu'
import Link from '@/components/Link'
import ColorModeSwitch from '@/components/ColorModeSwitch'

function Navbar(props: ButtonGroupProps) {
  const [session, loading] = useSession()
  const username = session?.user?.name ? session.user.name : ''

  return (
    <Box as="nav">
      <ButtonGroup
        position="sticky"
        top="0"
        justifyContent="center"
        alignItems="center"
        variant="link"
        bg="red"
        p="2"
        w="100%"
        {...props}
      >
        <ColorModeSwitch />
        {loading && <Spinner />}
        {session && (
          <>
            <Box>Hello, {username}</Box>
            <UserMenu username={username} />
          </>
        )}
        {!loading && !session && (
          <Link href="/auth/sign-in">
            <Button>Sign In</Button>
          </Link>
        )}
      </ButtonGroup>
    </Box>
  )
}

export default Navbar
