import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  MenuProps,
  Spinner,
  Text,
  Portal,
} from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/client'
import { CgLogOut } from 'react-icons/cg'
import { FiSettings } from 'react-icons/fi'
import useColors from '@/common/hooks/useColors'
import UserAvatar from '@/common/components/UserAvatar'
import Link from '@/common/components/Link'

type UserMenuProps = Omit<MenuProps, 'children'>

function UserMenu(props: UserMenuProps) {
  const [session, loading] = useSession()
  const signInColor = useColors('highlight')

  if (loading) return <Spinner />
  if (!session || !session.user) {
    return (
      <Link href="/auth/sign-in">
        <Button variant="link" color={signInColor}>
          Sign In
        </Button>
      </Link>
    )
  }

  const { name, image, points } = session.user

  return (
    <Menu {...props}>
      <MenuButton>
        <Flex m="2">
          <UserAvatar src={image ?? undefined} />
          <Box ml="3" textAlign="left">
            <Text fontWeight="bold">{name}</Text>
            <Text fontWeight="bold" fontSize="sm" color="primary">
              {points.toLocaleString()} points
            </Text>
          </Box>
        </Flex>
      </MenuButton>
      <Portal>
        <MenuList>
          <MenuItem icon={<FiSettings size="18" />}>Settings</MenuItem>
          <MenuDivider />
          <MenuItem
            icon={<CgLogOut size="18" />}
            onClick={() => signOut({ redirect: false })}
          >
            Sign Out
          </MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  )
}

export default UserMenu
