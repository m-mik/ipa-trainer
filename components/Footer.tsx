import { Box, BoxProps, Icon } from '@chakra-ui/react'
import Link from '@/components/Link'
import { FaGithub } from '@react-icons/all-files/fa/FaGithub'

function Footer(props: BoxProps) {
  return (
    <Box as="footer" textAlign="right" {...props}>
      <Link
        href="https://github.com/m-mik/ipa-trainer"
        chakraProps={{ isExternal: true }}
      >
        <Icon as={FaGithub} /> m-mik/ipa-trainer
      </Link>
    </Box>
  )
}

export default Footer
