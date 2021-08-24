import { mode } from '@chakra-ui/theme-tools'
import colors from './colors'

const { light, dark } = colors

const styles = {
  global: (props: Record<string, any>) => ({
    body: {
      color: mode(light.fg, dark.fg)(props),
      bg: mode(light.bg, dark.bg)(props),
    },
    h2: {
      color: mode(light.primary, dark.primary)(props),
      mb: '10',
    },
  }),
}

export default styles
