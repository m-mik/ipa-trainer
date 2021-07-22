import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react'

type LinkProps = React.PropsWithChildren<ChakraLinkProps> &
  Pick<NextLinkProps, 'href'>

function Link({ children, href, ...props }: LinkProps) {
  return (
    <NextLink href={href} passHref>
      <ChakraLink {...props}>{children}</ChakraLink>
    </NextLink>
  )
}

export default Link
