import Head from 'next/head'
import { Box, Grid } from '@chakra-ui/react'
import Footer from './Footer'
import Header from './Header'

type DefaultLayoutProps = {
  children: React.ReactNode
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <Head>
        <title>IPA Trainer</title>
      </Head>
      <Grid
        templateAreas={{
          base: "'header' 'content' 'footer'",
        }}
        autoRows={{
          base: 'min-content auto min-content',
        }}
        minH="calc(100vh - 20px)"
      >
        <Header gridArea="header" />
        <Box gridArea="content" as="main" mt="50px">
          {children}
        </Box>
        <Footer gridArea="footer" />
      </Grid>
    </>
  )
}

export default DefaultLayout
