import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Spacer,
  Text,
  FlexProps,
  useColorModeValue,
} from '@chakra-ui/react'
import Link from '@/components/Link'
import ColorModeSwitch from '@/components/ColorModeSwitch'

function Header(props: FlexProps) {
  const colors = {
    heading: useColorModeValue('orange.400', 'orange.200'),
    ipaText: useColorModeValue('orange.800', 'orange.300'),
  }

  return (
    <Flex as="header" {...props} minH="100">
      <Box>
        <Link href="/" chakraProps={{ _hover: { textDecoration: 'none' } }}>
          <Heading
            as="h1"
            size="2xl"
            color={colors.heading}
            textShadow="1px 2px 0px #000"
            fontFamily="Indie Flower"
          >
            IPA Trainer
          </Heading>
        </Link>
        <Text color={colors.ipaText} fontSize="md" fontFamily="Indie Flower">
          /ˌaɪ.piːˈeɪ/ /ˈtreɪ.nɚ/
        </Text>
      </Box>
      <Spacer />
      <HStack spacing="4" h="fit-content">
        <ColorModeSwitch />
        <Button>Sign Up</Button>
        <Button>Log In</Button>
      </HStack>
    </Flex>
  )
}

export default Header
