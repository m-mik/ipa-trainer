import { HeadingProps, Text, useColorModeValue } from '@chakra-ui/react'
import colors from '@/theme/colors'

function Logo(props: HeadingProps) {
  return (
    <>
      <Text
        color={useColorModeValue(colors.dark, colors.light)}
        fontSize="2xl"
        fontWeight="600"
        {...props}
      >
        IPA Trainer
      </Text>
    </>
  )
}

export default Logo
