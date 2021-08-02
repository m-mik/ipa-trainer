import colors from '@/theme/colors'
import { mode, whiten } from '@chakra-ui/theme-tools'

type Dict = Record<string, any>

const Tooltip = {
  baseStyle: (props: Dict) => ({
    bg: mode(
      whiten(colors.light.bg, 20)(props),
      whiten(colors.dark.bg, 20)(props)
    )(props),
    color: mode(
      whiten(colors.light.fg, 20)(props),
      whiten(colors.dark.fg, 20)(props)
    )(props),
  }),
}

export default Tooltip
