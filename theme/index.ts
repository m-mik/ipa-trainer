import { extendTheme, ThemeConfig } from '@chakra-ui/react'
import styles from '@/theme/styles'
import breakpoints from '@/theme/foundations/breakpoints'
import { fonts } from '@/theme/foundations/typography'
import colors from '@/theme/colors'
import Button from '@/theme/components/Button'
import Switch from '@/theme/components/Switch'
import Input from '@/theme/components/Input'
import Menu from '@/theme/components/Menu'
import Tooltip from '@/theme/components/Tooltip'

const config: ThemeConfig = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
}

const overrides = {
  colors,
  styles,
  fonts,
  breakpoints,
  components: {
    Button,
    Switch,
    Input,
    Menu,
    Tooltip,
  },
  config,
}

export default extendTheme(overrides)
