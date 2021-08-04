import { Box, BoxProps, Icon } from '@chakra-ui/react'
import Link from '@/common/components/Link'
import { FaGithub } from 'react-icons/fa'

function Footer(props: BoxProps) {
  return (
    <Box as="footer" p="5" textAlign="right" {...props}>
      <Link href="https://github.com/m-mik/ipa-trainer" isExternal>
        <Icon as={FaGithub} /> m-mik/ipa-trainer
      </Link>
    </Box>
  )
}

export default Footer
