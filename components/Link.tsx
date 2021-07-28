import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'

type LinkProps = React.PropsWithChildren<ChakraLinkProps> &
  Pick<NextLinkProps, 'href'> & { styleActive?: boolean }

function Link({ children, href, styleActive = true, ...props }: LinkProps) {
  const router = useRouter()
  const isActive = router.pathname === href
  const shouldStyleActive = styleActive && isActive
  const activeProps = {
    borderBottom: '2px',
  }

  return (
    <NextLink href={href} passHref>
      <ChakraLink {...props}>
        {React.Children.map<ReactNode, ReactNode>(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(
              child,
              shouldStyleActive ? activeProps : {}
            )
          }
        })}
      </ChakraLink>
    </NextLink>
  )
}

export default Link
