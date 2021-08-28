import { Center, CenterProps } from '@chakra-ui/react'
import React from 'react'

type SymbolProps = CenterProps & {
  name: string
}

const Symbol = React.forwardRef<HTMLDivElement, SymbolProps>(
  ({ name, ...rest }: SymbolProps, ref) => {
    return (
      <Center
        w="50px"
        h="50px"
        fontSize="2.5em"
        userSelect="none"
        aria-label="Select symbol"
        border="1px"
        ref={ref}
        {...rest}
      >
        {name}
      </Center>
    )
  }
)

Symbol.displayName = 'Symbol'

export default Symbol
