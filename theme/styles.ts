import { mode, darken, whiten } from '@chakra-ui/theme-tools'
import colors from '@/theme/colors'

const { light, dark } = colors

const styles = {
  global: (props: any) => ({
    body: {
      color: mode(dark, light)(props),
      //bgGradient: mode(colors.light, colors.dark)(props),
      bg: mode(light, dark)(props),
      /*bgGradient: mode(
        `linear(to-b, ${light}, ${darken(light, 5)(props)})`,
        `linear(to-b, ${dark}, ${darken(dark, 5)(props)})`
      )(props),*/
    }, // ${darken(colors.light, 20)
  }),
}

export default styles
