import React, { FC, ReactElement } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { render, RenderOptions } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { LessonUiProvider } from '@/modules/lesson/providers/LessonUiProvider'
import theme from '@/theme/index'

const queryClient = new QueryClient()

const Providers: FC = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <LessonUiProvider>{children}</LessonUiProvider>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

type MockNextUseRouterOptions = {
  route?: string
  pathname?: string
  query?: object
  asPath?: string
}

export function mockNextUseRouter({
  route = '/',
  pathname = '/',
  query = {},
  asPath = '/',
}: MockNextUseRouterOptions) {
  useRouter.mockImplementation(() => ({
    route: route,
    pathname: pathname,
    query: query,
    asPath: asPath,
    push: jest.fn().mockResolvedValue(true),
    replace: jest.fn().mockResolvedValue(true),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn().mockResolvedValue(undefined),
    beforePopState: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
  }))
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: Providers, ...options })

export * from '@testing-library/react'
export { customRender as render }
