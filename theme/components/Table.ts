import { Dict } from '@chakra-ui/utils'
import { colorMode } from '../colors'

const Table = {
  baseStyle: {},
  sizes: {},
  variants: {
    striped: (props: Dict) => ({
      th: {
        bg: colorMode('bg')(props),
      },
      td: {
        bg: colorMode('bg')(props),
      },
      tbody: {
        tr: {
          '&:nth-of-type(odd)': {
            td: {
              background: colorMode('secondary')(props),
            },
          },
        },
      },
    }),
  },
  defaultProps: {},
}

export default Table
