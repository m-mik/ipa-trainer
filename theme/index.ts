import {
  extendTheme,
  ThemeConfig,
  withDefaultColorScheme,
} from '@chakra-ui/react'
import styles from '@/theme/styles'
import { fonts } from '@/theme/foundations/typography'
import breakpoints from '@/theme/foundations/breakpoints'

const config: ThemeConfig = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
}

const overrides = {
  styles,
  fonts,
  breakpoints,
  config,
}

export default extendTheme(
  overrides,
  withDefaultColorScheme({ colorScheme: 'orange' })
)
