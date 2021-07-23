import Head from 'next/head'
import { Box, Grid } from '@chakra-ui/react'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

type LayoutProps = {
  children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>IPA Trainer</title>
      </Head>
      <Grid
        gridTemplateAreas={{
          base: "'header' 'content' 'footer'",
        }}
      >
        <Header gridArea="header" />
        <Box gridArea="content" as="main">
          {children}
        </Box>
        <Footer gridArea="footer" />
      </Grid>
    </>
  )
}

export default Layout
