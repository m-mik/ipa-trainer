import { BoxProps, Button, Heading, Text, VStack } from '@chakra-ui/react'
import colors from '@/theme/colors'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { darken } from '@chakra-ui/theme-tools'

function Hero(props: BoxProps) {
  return (
    <VStack
      spacing="6"
      p="4"
      color="primary"
      minH="200"
      bg="dark"
      textAlign="center"
      {...props}
    >
      <Heading
        size="4xl"
        fontWeight="800"
        as="h1"
        position="relative"
        zIndex="1"
        _after={{
          content: '""',
          bgGradient: `linear(to-t, ${colors.primary}, ${colors.dark})`,
          opacity: 0.2,
          position: 'absolute',
          bottom: '-10px',
          left: 0,
          width: '100%',
          height: '50%',
          zIndex: -1,
          borderRadius: '40%',
        }}
      >
        IPA Trainer
      </Heading>
      <Text fontSize="3xl" fontWeight="800" color="light">
        Improve your English pronunciation{' '}
        <Text as="span" color="highlight">
          with ease
        </Text>
      </Text>
      <Button rounded={'full'} px={6} rightIcon={<AiOutlineArrowRight />}>
        Get started
      </Button>
    </VStack>
  )
}

export default Hero
