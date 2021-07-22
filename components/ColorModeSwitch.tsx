import { Box, BoxProps, Icon, Switch, useColorMode } from '@chakra-ui/react'
import { FaMoon, FaSun } from 'react-icons/fa'

function ColorModeSwitch(props: BoxProps) {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  return (
    <Box {...props}>
      <Switch
        aria-label="Switch color mode"
        colorScheme="black"
        isChecked={isDark}
        onChange={toggleColorMode}
        mr="1"
      />
      {isDark ? (
        <Icon color="orange" as={FaMoon} />
      ) : (
        <Icon color="yellow" as={FaSun} />
      )}
    </Box>
  )
}

export default ColorModeSwitch