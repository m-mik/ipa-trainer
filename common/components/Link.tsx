import NextLink from 'next/link'
import type { UrlObject } from 'url'
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'

type LinkProps = Omit<ChakraLinkProps, 'href'> & {
  href: string | UrlObject
  styleActive?: boolean
}

function Link({ children, href, styleActive = true, ...props }: LinkProps) {
  const router = useRouter()

  if (!href) {
    return <>{children}</>
  }

  const hrefPath =
    typeof href === 'string'
      ? href
      : href?.pathname ?? ''

  const isActive =
    styleActive && router.pathname === hrefPath

  const activeProps = {
    borderBottom: '2px',
  }

  return (
    <NextLink href={href} passHref>
      <ChakraLink {...props}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(
              child,
              isActive ? activeProps : {}
            )
          }
          return child
        })}
      </ChakraLink>
    </NextLink>
  )
}

export default Link