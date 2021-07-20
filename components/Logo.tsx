import {
  Heading,
  HeadingProps,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

function Logo(props: HeadingProps) {
  const colors = {
    heading: useColorModeValue('orange.400', 'orange.200'),
    ipaText: useColorModeValue('orange.800', 'orange.300'),
  }

  return (
    <>
      <Heading
        as="h1"
        size="2xl"
        color={colors.heading}
        textShadow="1px 2px 0px #000"
        fontFamily="Indie Flower"
        {...props}
      >
        IPA Trainer
      </Heading>
      <Text color={colors.ipaText} fontSize="md" fontFamily="Indie Flower">
        /ˌaɪ.piːˈeɪ/ /ˈtreɪ.nɚ/
      </Text>
    </>
  )
}

export default Logo
