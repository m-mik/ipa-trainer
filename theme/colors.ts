import { mode } from '@chakra-ui/theme-tools'

export type ColorTypes =
  | 'primary'
  | 'secondary'
  | 'highlight'
  | 'warning'
  | 'danger'
  | 'info'
  | 'success'
  | 'fg'
  | 'bg'

export interface Colors {
  [Index: string]: Record<ColorTypes, string>
  light: Record<ColorTypes, string>
  dark: Record<ColorTypes, string>
}

const colors: Colors = {
  light: {
    primary: '#033f5f',
    secondary: '#ffb703',
    highlight: '#2bc4e7',
    warning: '#ffb007',
    danger: '#bd1a0b',
    info: '#008f83',
    success: '#6ab91a',
    fg: '#232222',
    bg: '#e9e9e9',
  },
  dark: {
    primary: '#ffb703',
    secondary: '#515555',
    highlight: '#2bc4e7',
    warning: '#ffb007',
    danger: '#bd1a0b',
    info: '#008f83',
    success: '#6ab91a',
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
