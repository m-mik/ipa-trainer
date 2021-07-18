import { useColorMode, Switch, SwitchProps } from '@chakra-ui/react'

type ColorModeSwitchProps = SwitchProps

function ColorModeSwitch(props: ColorModeSwitchProps) {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  return (
    <Switch
      position="fixed"
      top="1rem"
      right="1rem"
      color="green"
      isChecked={isDark}
      onChange={toggleColorMode}
      {...props}
    />
  )
}

export default ColorModeSwitch
