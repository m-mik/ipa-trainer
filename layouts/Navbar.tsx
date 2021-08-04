import {
  Box,
  BoxProps,
  Button,
  ButtonGroup,
  ButtonGroupProps,
  chakra,
  Divider,
  Flex,
  HStack,
  IconButton,
  Spacer,
  useDisclosure,
  useOutsideClick,
  VStack,
  Portal,
} from '@chakra-ui/react'
import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'
import { motion } from 'framer-motion'
import UserMenu from '@/modules/auth/components/UserMenu'
import ColorModeSwitch from '@/common/components/ColorModeSwitch'
import Link from '@/common/components/Link'
import useColors from '@/common/hooks/useColors'

interface NavItem {
  text: string
  href: string
}

const NAV_ITEMS: NavItem[] = [
  {
    text: 'Learn',
    href: '/learn',
  },
  {
    text: 'Leaderboard',
    href: '/leaderboard',
  },
]

function Navbar(props: BoxProps) {
  return (
    <Box as="nav" {...props}>
      <MobileNav items={NAV_ITEMS} d={{ base: 'flex', md: 'none' }} />
      <DesktopNav items={NAV_ITEMS} d={{ base: 'none', md: 'flex' }} />
    </Box>
  )
}

type DesktopNavProps = ButtonGroupProps & {
  items: NavItem[]
}

function DesktopNav({ items, ...rest }: DesktopNavProps) {
  return (
    <ButtonGroup
      variant="link"
      spacing="5"
      d="flex"
      alignItems="center"
      {...rest}
    >
      <ColorModeSwitch />
      {items.map(({ href, text }) => (
        <Link key={text} href={href}>
          <Button>{text}</Button>
        </Link>
      ))}
      <Spacer w="50px" />
      <UserMenu />
    </ButtonGroup>
  )
}

const MotionBox = motion(chakra.div)

type MobileNavProps = BoxProps & {
  items: NavItem[]
}

function MobileNav({ items, ...rest }: MobileNavProps) {
  const { isOpen, onToggle, onClose } = useDisclosure()
  const ref = React.useRef<HTMLDivElement>(null)
  const dividerColor = useColors('primary')
  const menuBgColor = useColors('secondary')

  useOutsideClick({
    ref,
    handler: () => onClose(),
  })

  return (
    <HStack spacing="5" alignItems="center" {...rest}>
      <UserMenu />
      <IconButton
        icon={<GiHamburgerMenu />}
        aria-label="Open menu"
        variant="outline"
        onClick={onToggle}
      />
      {isOpen && (
        <Portal>
          <Flex
            position="fixed"
            top="0"
            left="0"
            w="100%"
            h="100%"
            bg="rgba(0, 0, 0, .3)"
            zIndex="3"
          >
            <MotionBox
              ref={ref}
              ml="auto"
              h="100%"
              w="200px"
              p="5"
              bg={menuBgColor}
              initial={{ x: 250 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <VStack
                spacing="4"
                d="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Flex justifyContent="space-between" w="100%">
                  <ColorModeSwitch />
                  <IconButton
                    icon={<AiOutlineClose />}
                    aria-label="Close menu"
                    variant="outline"
                    alignSelf="flex-end"
                    onClick={onClose}
                  />
                </Flex>
                <Divider border="1px" borderColor={dividerColor} />
                {items.map(({ href, text }) => (
                  <Link w="100%" key={text} href={href}>
                    <Button onClick={onClose} isFullWidth={true}>
                      {text}
                    </Button>
                  </Link>
                ))}
                <Divider border="1px" borderColor={dividerColor} />
              </VStack>
            </MotionBox>
          </Flex>
        </Portal>
      )}
    </HStack>
  )
}

export default Navbar
