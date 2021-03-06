import { ColorTypes, generateColorModeKeys } from '@/theme/colors'
import { useColorModeValue } from '@chakra-ui/react'

function useColors(colorType: ColorTypes) {
  const keys = generateColorModeKeys(colorType)
  return useColorModeValue(...keys)
}

export default useColors
