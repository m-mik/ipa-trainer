import { colorMode } from '../colors'

type Dict = Record<string, any>

const Menu = {
  baseStyle: (props: Dict) => ({
    list: {
      bg: colorMode('secondary')(props),
    },
  }),
  sizes: {},
  variants: {},
  defaultProps: {},
}

export default Menu
