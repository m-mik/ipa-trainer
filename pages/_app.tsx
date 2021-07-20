import '@fontsource/roboto/400.css'
import '@fontsource/indie-flower/400.css'
import { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import theme from '@/theme'
import Layout from '@/components/Layout'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider session={pageProps.session}>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </Provider>
    </QueryClientProvider>
  )
}

export default MyApp
