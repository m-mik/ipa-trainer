import { BoxProps, Center, Icon, Switch, useColorMode } from '@chakra-ui/react'
import { FaMoon, FaSun } from 'react-icons/fa'

function ColorModeSwitch(props: BoxProps) {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  return (
    <Center {...props}>
      <Switch
        aria-label="Switch color mode"
        isChecked={isDark}
        onChange={toggleColorMode}
        mr="1"
      />
      {isDark ? (
        <Icon color="dark.primary" as={FaMoon} />
      ) : (
        <Icon color="light.primary" as={FaSun} />
      )}
    </Center>
  )
}

export default ColorModeSwitch
