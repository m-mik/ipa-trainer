import { darken, mode, whiten } from '@chakra-ui/theme-tools'
import colors, { colorMode } from '../colors'

type Dict = Record<string, any>

const Button = {
  baseStyle: {},
  sizes: {},
  variants: {
    solid: (props: Dict) => ({
      bg: colorMode('primary')(props),
      color: colorMode('bg')(props),
      _hover: {
        bg: mode(
          whiten(colors.light.primary, 20)(props),
          whiten(colors.dark.primary, 20)(props)
        )(props),
      },
    }),
    secondary: (props: Dict) => ({
      bg: colorMode('secondary')(props),
      color: colorMode('fg')(props),
      _hover: {
        bg: mode(
          whiten(colors.light.secondary, 20)(props),
          whiten(colors.dark.secondary, 20)(props)
        )(props),
      },
    }),
    outline: (props: Dict) => ({
      bg: colorMode('bg')(props),
      color: colorMode('primary')(props),
      borderColor: colorMode('primary')(props),
      _hover: {
        bg: mode(
          darken(colors.light.bg, 20)(props),
          whiten(colors.dark.bg, 20)(props)
        )(props),
      },
    }),
    ghost: (props: Dict) => ({
      bg: colorMode('bg')(props),
      color: colorMode('primary')(props),
      borderColor: colorMode('primary')(props),
      _hover: {
        bg: mode(
          darken(colors.light.bg, 20)(props),
          whiten(colors.dark.bg, 20)(props)
        )(props),
      },
    }),
    link: (props: Dict) => ({
      color: colorMode('primary')(props),
      borderColor: colorMode('primary')(props),
    }),
  },
  defaultProps: {},
}

export default Button
