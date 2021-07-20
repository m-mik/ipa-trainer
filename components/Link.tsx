import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react'

type LinkProps = {
  chakraProps?: ChakraLinkProps
} & React.PropsWithChildren<NextLinkProps>

function Link({ children, chakraProps, ...props }: LinkProps) {
  return (
    <NextLink passHref {...props}>
      <ChakraLink {...chakraProps}>{children}</ChakraLink>
    </NextLink>
  )
}

export default Link
