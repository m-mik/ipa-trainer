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
  Portal,
  Spinner,
  Text,
} from '@chakra-ui/react'
import { CgLogOut } from 'react-icons/cg'
import { FiSettings } from 'react-icons/fi'
import { BsPerson } from 'react-icons/bs'
import useColors from '@/hooks/useColors'
import UserAvatar from '@/components/UserAvatar'
import Link from '@/components/Link'
import useSession from '@/hooks/useSession'
import { useQueryClient } from 'react-query'
import { signOut } from 'next-auth/client'
import useSessionUi from '@/modules/lesson/hooks/useLessonUi'
import { ActionType } from '@/modules/lesson/store/lessonUiActions'

type UserMenuProps = Omit<MenuProps, 'children'>

function UserMenu(props: UserMenuProps) {
  const queryClient = useQueryClient()
  const [session, loading] = useSession()
  const { dispatch } = useSessionUi()

  const colors = {
    signIn: useColors('highlight'),
    points: useColors('highlight'),
  }

  if (loading) return <Spinner />
  if (!session || !session.user) {
    return (
      <Link href="/auth/sign-in">
        <Button variant="link" color={colors.signIn}>
          Sign In
        </Button>
      </Link>
    )
  }

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    queryClient.setQueryData('session', null)
    setTimeout(() => {
      queryClient.clear()
      dispatch({ type: ActionType.ResetActiveSymbolIndex })
      dispatch({ type: ActionType.ResetSymbols })
      dispatch({ type: ActionType.ResetActiveQuestion })
    }, 0)
  }

  const { id, name, image, points } = session.user

  return (
    <Menu {...props}>
      <MenuButton>
        <Flex m="2">
          <UserAvatar src={image ?? undefined} />
          <Box ml="3" textAlign="left">
            <Text fontWeight="bold">{name}</Text>
            <Text fontWeight="bold" fontSize="sm" color={colors.points}>
              {points.toLocaleString()} points
            </Text>
          </Box>
        </Flex>
      </MenuButton>
      <Portal>
        <MenuList>
          <Link href={`/user/${id}`}>
            <MenuItem icon={<BsPerson size="18" />}>Profile</MenuItem>
          </Link>
          <Link href="/settings">
            <MenuItem icon={<FiSettings size="18" />}>Settings</MenuItem>
          </Link>
          <MenuDivider />
          <MenuItem icon={<CgLogOut size="18" />} onClick={handleSignOut}>
            Sign Out
          </MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  )
}

export default UserMenu
