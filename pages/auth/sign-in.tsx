import {
  Box,
  Button,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VisuallyHidden,
} from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { FaGithub } from 'react-icons/fa'
import { signIn } from 'next-auth/client'
import { IconType } from 'react-icons'
import Card from '@/components/Card'
import DividerWithText from '@/components/DividerWithText'
import LoginForm from '@/modules/auth/components/LoginForm'
import { Credentials } from '@/modules/auth/types/Credentials'
import useSession from '@/hooks/useSession'
import Breadcrumb from '@/components/Breadcrumb'
import { NextSeo } from 'next-seo'

interface Provider {
  name: string
  Icon: IconType
}

const providers: Array<Provider> = [{ name: 'Github', Icon: FaGithub }]

type SignInProps = { demoCredentials: Credentials }

function SignIn({ demoCredentials }: SignInProps) {
  const { username, password } = demoCredentials
  const router = useRouter()
  const [session] = useSession()
  if (session) {
    router.replace('/learn')
    return null
  }

  return (
    <>
      <NextSeo
        title="Sign In"
        description="Sign in with your Github or Google account"
      />
      <Container maxW="container.lg">
        <Breadcrumb
          items={{
            Home: '/',
            'Sign In': '/sign-in',
          }}
        />
        <Box px={{ base: '4', lg: '8' }}>
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
              <SimpleGrid mt="6" spacing="3">
                {providers.map(({ name, Icon }) => (
                  <Button
                    key={name}
                    color="currentColor"
                    variant="ghost"
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
      </Container>
    </>
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
