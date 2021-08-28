import '@fontsource/roboto'
import '@fontsource/montserrat'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { AppLayoutProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import DefaultLayout from '@/layouts/DefaultLayout'
import { LessonUiProvider } from '@/modules/lesson/providers/LessonUiProvider'
import theme from '../theme'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppLayoutProps) {
  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>)
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <LessonUiProvider>
          <DefaultSeo
            titleTemplate="IPA Trainer - %s"
            description="Improve your English pronunciation"
          />
          {getLayout(<Component {...pageProps} />)}
        </LessonUiProvider>
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default MyApp
