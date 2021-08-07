import {
  BoxProps,
  Button,
  Heading,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { AiOutlineArrowRight } from 'react-icons/ai'
import Link from '@/components/Link'
import useColors from '../../../common/hooks/useColors'

function Hero(props: BoxProps) {
  return (
    <VStack
      spacing="6"
      p="4"
      color={useColors('primary')}
      minH="200"
      textAlign="center"
      {...props}
    >
      <Heading
        size="4xl"
        fontWeight="800"
        as="h1"
        position="relative"
        _after={{
          content: '""',
          bgGradient: useColorModeValue(
            `linear(to-t, light.primary, light.bg)`,
            `linear(to-t, dark.primary, dark.bg)`
          ),
          opacity: '0.2',
          position: 'absolute',
          bottom: '-10px',
          left: '0',
          width: '100%',
          height: '50%',
          zIndex: 'hide',
          borderRadius: '40%',
          filter: 'blur(4px)',
        }}
      >
        IPA Trainer
      </Heading>
      <Text fontSize="3xl" fontWeight="800" color={useColors('fg')}>
        Improve your English pronunciation{' '}
        <Text as="span" color={useColors('highlight')}>
          with ease
        </Text>
      </Text>
      <Link href="/learn">
        <Button
          variant="solid"
          rounded="full"
          px="6"
          rightIcon={<AiOutlineArrowRight />}
        >
          Get started
        </Button>
      </Link>
    </VStack>
  )
}

export default Hero
