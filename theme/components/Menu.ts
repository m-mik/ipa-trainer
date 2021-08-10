import { Dict } from '@chakra-ui/utils'
import { colorMode } from '../colors'

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
