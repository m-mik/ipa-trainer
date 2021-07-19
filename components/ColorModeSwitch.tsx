import { useColorMode, Switch, SwitchProps } from '@chakra-ui/react'

function ColorModeSwitch(props: SwitchProps) {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  return <Switch isChecked={isDark} onChange={toggleColorMode} {...props} />
}

export default ColorModeSwitch
