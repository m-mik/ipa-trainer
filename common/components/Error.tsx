import { Box, BoxProps, Heading, Icon } from '@chakra-ui/react'
import { VscError } from 'react-icons/vsc'
import { BiError } from 'react-icons/bi'
import { IconType } from 'react-icons'
import useColors from '@/common/hooks/useColors'
import { NextPageContext } from 'next'

type ErrorProps = BoxProps & {
  statusCode: number
}

const statusCodes: { [key: number]: { message: string; icon: IconType } } = {
  404: {
    message: 'Not Found',
    icon: VscError,
  },
  500: {
    message: 'Something Went Wrong',
    icon: BiError,
  },
}

function Error({ statusCode, ...rest }: ErrorProps) {
  const { message, icon } = statusCodes[statusCode] ?? statusCodes[500]

  return (
    <Box p="5" {...rest}>
      <Heading as="h2">{message}</Heading>

      <Icon as={icon} boxSize="10em" color={useColors('highlight')} mt="1em" />
    </Box>
  )
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return {
    statusCode,
  }
}

export default Error
