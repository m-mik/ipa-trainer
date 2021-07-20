import { Box, Button, ButtonGroup, ButtonGroupProps } from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/client'
import ColorModeSwitch from '@/components/ColorModeSwitch'
import Link from '@/components/Link'

function NavBar(props: ButtonGroupProps) {
  const [session] = useSession()

  return (
    <ButtonGroup variant="link" spacing="4" h="fit-content" {...props}>
      <ColorModeSwitch />
      {session && (
        <>
          <Box>Hello, {session.user?.name}</Box>
          <Button onClick={() => signOut({ redirect: false })}>Sign Out</Button>
        </>
      )}
      {!session && (
        <Link href="/auth/sign-in">
          <Button>Sign In</Button>
        </Link>
      )}
    </ButtonGroup>
  )
}

export default NavBar
