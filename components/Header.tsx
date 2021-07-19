import { Box, Button, Flex, FlexProps, Heading, Spacer } from '@chakra-ui/react'
import ColorModeSwitch from '@/components/ColorModeSwitch'

function Header(props: FlexProps) {
  return (
    <Flex bg="green" as="header" p="3" {...props}>
      <Box p="2">
        <Heading size="md">IPA Trainer /ˌaɪ.piːˈeɪ/ /ˈtreɪ.nɚ/</Heading>
      </Box>
      <Spacer />
      <Box>
        <ColorModeSwitch ml="auto" mr="4" />
        <Button mr="4">Sign Up</Button>
        <Button>Log in</Button>
      </Box>
    </Flex>
  )
}

export default Header
