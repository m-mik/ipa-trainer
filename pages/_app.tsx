import '@fontsource/roboto/400.css'
import { Provider as NextProvider } from 'next-auth/client'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AppLayoutProps } from 'next/app'
import theme from '@/theme'
import Layout from '@/components/Layout'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppLayoutProps) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>)
  return (
    <QueryClientProvider client={queryClient}>
      <NextProvider session={pageProps.session}>
        <ChakraProvider theme={theme}>
          {getLayout(<Component {...pageProps} />)}
        </ChakraProvider>
      </NextProvider>
    </QueryClientProvider>
  )
}

export default MyApp
