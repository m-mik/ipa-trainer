import { colorMode } from '@/theme/colors'

type Dict = Record<string, any>

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
