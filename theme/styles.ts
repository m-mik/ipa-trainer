import { mode } from '@chakra-ui/theme-tools'

const styles = {
  global: (props: any) => ({
    body: {
      color: mode('gray.800', 'whiteAlpha.900')(props),
      bg: mode('gray.200', 'gray.700')(props),
    },
  }),
}

export default styles
