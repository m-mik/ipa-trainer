import {
  Badge,
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  MenuProps,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { signOut } from 'next-auth/client'
import UserAvatar from '@/components/UserAvatar'
import { CgLogOut } from 'react-icons/cg'
import { FiSettings } from 'react-icons/fi'

type UserMenuProps = {
  username: string
} & Omit<MenuProps, 'children'>

function UserMenu({ username, ...props }: UserMenuProps) {
  return (
    <Menu {...props}>
      <MenuButton>
        <Flex m="2">
          <UserAvatar />
          <Box ml="3" textAlign="left">
            <Text fontWeight="bold">
              {username}
              <Badge ml="1" colorScheme="yellow">
                Pro
              </Badge>
            </Text>
            <Text
              fontWeight="bold"
              fontSize="sm"
              color={useColorModeValue('green.700', 'green.100')}
            >
              {(1000).toLocaleString()} points
            </Text>
          </Box>
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuDivider />
        <MenuItem icon={<FiSettings size="18" />}>Settings</MenuItem>
        <MenuDivider />
        <MenuItem
          icon={<CgLogOut size="18" />}
          onClick={() => signOut({ redirect: false })}
        >
          Sign Out
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default UserMenu
