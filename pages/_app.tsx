import '@fontsource/roboto'
import '@fontsource/montserrat'
import { Provider as NextProvider } from 'next-auth/client'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { AppLayoutProps } from 'next/app'
import DefaultLayout from '@/layouts/DefaultLayout'
import theme from '../theme'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppLayoutProps) {
  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>)
  return (
    <QueryClientProvider client={queryClient}>
      <NextProvider session={pageProps.session}>
        <ChakraProvider theme={theme}>
          {getLayout(<Component {...pageProps} />)}
        </ChakraProvider>
      </NextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default MyApp
