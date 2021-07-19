import { Box, BoxProps, Icon, Link } from '@chakra-ui/react'
import { FaGithub } from '@react-icons/all-files/fa/FaGithub'

function Footer(props: BoxProps) {
  return (
    <Box as="footer" textAlign="right" {...props}>
      <Link href="https://github.com/m-mik/ipa-trainer" isExternal>
        <Icon as={FaGithub} /> m-mik/ipa-trainer
      </Link>
    </Box>
  )
}

export default Footer
