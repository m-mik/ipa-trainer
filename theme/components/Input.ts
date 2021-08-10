import { mode, whiten } from '@chakra-ui/theme-tools'
import { Dict } from '@chakra-ui/utils'
import colors from '../colors'

const Input = {
  variants: {
    outline: (props: Dict) => ({
      field: {
        bg: mode(
          whiten(colors.light.bg, 20)(props),
          whiten(colors.dark.bg, 20)(props)
        )(props),
      },
    }),
  },
}

export default Input
