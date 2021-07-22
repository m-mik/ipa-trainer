import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Text,
  VisuallyHidden,
} from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { FaGithub } from 'react-icons/fa'
import { FaGoogle } from 'react-icons/fa'
import { signIn, useSession } from 'next-auth/client'
import Card from '@/components/Card'
import DividerWithText from '@/components/DividerWithText'
import LoginForm from '@/components/LoginForm'
import { Credentials } from '@/hooks/useSignIn'

type SignInProps = { demoCredentials: Credentials }

function SignIn({ demoCredentials }: SignInProps) {
  const providers = [
    { name: 'Github', Icon: FaGithub },
    { name: 'Google', Icon: FaGoogle },
  ]

  const { username, password } = demoCredentials
  const router = useRouter()
  const [session] = useSession()
  if (session) {
    router.replace('/')
    return null
  }

  return (
    <Box minH="100vh" px={{ base: '4', lg: '8' }}>
      <Box maxW="md" mx="auto">
        <Heading size="lg" fontWeight="extrabold" textAlign="center">
          Sign in to your account
        </Heading>
        <Text textAlign="center" size="md" color="['gray.700', 'gray.300']">
          Test account: {username} / {password}
        </Text>

        <Card mt="5">
          <LoginForm />
          <DividerWithText mt="6">or continue with</DividerWithText>
          <SimpleGrid mt="6" columns={2} spacing="3">
            {providers.map(({ name, Icon }) => (
              <Button
                key={name}
                color="currentColor"
                variant="outline"
                onClick={() => signIn(name.toLowerCase())}
                rightIcon={<Icon />}
              >
                <VisuallyHidden>Login with {name}</VisuallyHidden>
                {name}
              </Button>
            ))}
          </SimpleGrid>
        </Card>
      </Box>
    </Box>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      demoCredentials: {
        username: process.env.DEMO_USERNAME,
        password: process.env.DEMO_PASSWORD,
      },
    },
  }
}

export default SignIn
