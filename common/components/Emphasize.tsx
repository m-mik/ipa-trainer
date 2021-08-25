import React from 'react'
import { Text, TextProps } from '@chakra-ui/react'
import useColors from '@/hooks/useColors'

type EmphasizeProps = TextProps & { text: React.ReactNode }

const Emphasize = ({ text, ...rest }: EmphasizeProps) => {
  return (
    <Text as="strong" color={useColors('primary')} {...rest}>
      {text}
    </Text>
  )
}

export default Emphasize
