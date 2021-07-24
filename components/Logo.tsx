import { HeadingProps, Text } from '@chakra-ui/react'
import useColors from '@/hooks/useColors'

function Logo(props: HeadingProps) {
  return (
    <>
      <Text color={useColors('fg')} fontSize="2xl" fontWeight="600" {...props}>
        IPA Trainer
      </Text>
    </>
  )
}

export default Logo
