import { ColorTypes, generateColorModeKeys } from '@/modules/core/theme/colors'
import { useColorModeValue } from '@chakra-ui/react'

function useColors(colorType: ColorTypes) {
  const keys = generateColorModeKeys(colorType)
  return useColorModeValue(...keys)
}

export default useColors
