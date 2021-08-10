import { Dict } from '@chakra-ui/utils'
import { colorMode } from '../colors'

const Switch = {
  baseStyle: (props: Dict) => ({
    track: {
      bg: colorMode('fg')(props),
      _checked: {
        bg: 'secondary',
      },
    },
    thumb: {
      bg: colorMode('bg')(props),
    },
  }),
  sizes: {},
  variants: {},
  defaultProps: {},
}

export default Switch
