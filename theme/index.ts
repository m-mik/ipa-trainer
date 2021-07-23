import { extendTheme, ThemeConfig } from '@chakra-ui/react'
import styles from '@/theme/styles'
import breakpoints from '@/theme/foundations/breakpoints'
import { fonts } from '@/theme/foundations/typography'
import colors from '@/theme/colors'
import Button from '@/theme/components/Button'

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
  },
  config,
}

export default extendTheme(overrides)
