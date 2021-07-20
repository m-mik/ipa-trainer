import {
  Box,
  Button,
  chakra,
  FormControl,
  FormLabel,
  HTMLChakraProps,
  Input,
  Stack,
} from '@chakra-ui/react'
import * as React from 'react'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { PasswordField } from '@/components/PasswordField'
import useSignIn from '@/hooks/useSignIn'

function LoginForm(props: HTMLChakraProps<'form'>) {
  const { mutate: signIn, isLoading, isError } = useSignIn()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const focusUsernameInput = () => inputRef.current?.focus()

  useEffect(() => {
    setPassword('')
    focusUsernameInput()
  }, [isError])

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    signIn({ username, password })
  }

  return (
    <>
      {isError && (
        <Box
          bg="red.100"
          p="3"
          mb="5"
          color="red.700"
          borderLeft="5px solid"
          borderColor="red.700"
          textAlign="center"
        >
          Wrong username or password
        </Box>
      )}
      <chakra.form onSubmit={onSubmit} {...props}>
        <Stack spacing="6">
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input
              ref={inputRef}
              name="username"
              autoComplete="username"
              isRequired
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              isDisabled={isLoading}
            />
          </FormControl>
          <PasswordField
            onChange={(e) => setPassword(e.target.value)}
            isDisabled={isLoading}
            value={password}
          />
          <Button type="submit" size="lg" fontSize="md" isLoading={isLoading}>
            Sign in
          </Button>
        </Stack>
      </chakra.form>
    </>
  )
}

export default LoginForm
