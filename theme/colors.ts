import { mode } from '@chakra-ui/theme-tools'

export type ColorTypes = 'primary' | 'secondary' | 'highlight' | 'fg' | 'bg'

export interface Colors {
  [Index: string]: Record<ColorTypes, string>
  light: Record<ColorTypes, string>
  dark: Record<ColorTypes, string>
}

const colors: Colors = {
  light: {
    primary: '#033f5f',
    secondary: '#dcdcdc',
    highlight: '#2bc4e7',
    fg: '#232222',
    bg: '#e9e9e9',
  },
  dark: {
    primary: '#ffb703',
    secondary: '#303333',
    highlight: '#2bc4e7',
    fg: '#e9e9e9',
    bg: '#232222',
  },
}

export function generateColorModeKeys(colorType: ColorTypes) {
  return Object.keys(colors).map((mode) => `${mode}.${colorType}`) as [
    string,
    string
  ]
}

export function colorMode(colorType: ColorTypes) {
  const keys = generateColorModeKeys(colorType)
  return mode(...keys)
}

export default colors
