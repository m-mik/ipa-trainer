import { extendTheme, ThemeConfig } from '@chakra-ui/react'
import styles from './styles'
import breakpoints from './foundations/breakpoints'
import { fonts } from './foundations/typography'
import colors from './colors'
import Button from './components/Button'
import Switch from './components/Switch'
import Input from './components/Input'
import Menu from './components/Menu'
import Tooltip from './components/Tooltip'
import Table from './components/Table'
import Popover from './components/Popover'
import Spinner from './components/Spinner'
import Container from './components/Container'

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
    Table,
    Popover,
    Spinner,
    Container,
  },
  config,
}

export default extendTheme(overrides)
