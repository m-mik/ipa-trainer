import { BsChevronRight } from 'react-icons/bs'
import {
  BreadcrumbItem,
  BreadcrumbLink,
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbProps as ChakraBreadcrumbProps,
} from '@chakra-ui/react'
import Link from './Link'

type BreadcrumbProps = ChakraBreadcrumbProps & {
  items: Record<string, string>
}

function Breadcrumb({ items, ...rest }: BreadcrumbProps) {
  return (
    <>
      <ChakraBreadcrumb
        textAlign="left"
        mr="auto"
        spacing="8px"
        separator={<BsChevronRight color="gray.500" size={10} />}
        mb="10"
        {...rest}
      >
        {Object.entries(items).map(([name, href], index) => (
          <BreadcrumbItem
            key={name + index}
            isCurrentPage={index === Object.keys(items).length - 1}
          >
            <BreadcrumbLink as={Link} href={href}>
              {name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </ChakraBreadcrumb>
    </>
  )
}

export default Breadcrumb
