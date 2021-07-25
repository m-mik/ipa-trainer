import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  MenuProps,
  Text,
} from '@chakra-ui/react'
import { signOut } from 'next-auth/client'
import { CgLogOut } from 'react-icons/cg'
import { FiSettings } from 'react-icons/fi'
import { Portal } from 'next/dist/client/portal'
import useColors from '@/hooks/useColors'
import UserAvatar from '@/components/UserAvatar'

type UserMenuProps = {
  name: string
  imageUrl: string
} & Omit<MenuProps, 'children'>

function UserMenu({ imageUrl, name, ...props }: UserMenuProps) {
  return (
    <Menu {...props}>
      <MenuButton>
        <Flex m="2">
          <UserAvatar src={imageUrl} />
          <Box ml="3" textAlign="left">
            <Text fontWeight="bold">{name}</Text>
            <Text
              fontWeight="bold"
              fontSize="sm"
              color={useColors('highlight')}
            >
              {(1000).toLocaleString()} points
            </Text>
          </Box>
        </Flex>
      </MenuButton>
      <Portal type="menu">
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
