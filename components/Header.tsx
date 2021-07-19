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
  Link,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import ColorModeSwitch from '@/components/ColorModeSwitch'

function Header(props: FlexProps) {
  const colors = {
    heading: useColorModeValue('orange.400', 'orange.200'),
    ipaText: useColorModeValue('orange.800', 'orange.300'),
  }

  return (
    <Flex as="header" {...props} minH="100">
      <Box>
        <NextLink href="/" passHref>
          <Link>
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
        </NextLink>
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
