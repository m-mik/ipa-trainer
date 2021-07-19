import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Head from 'next/head'
import { Box, Container, Grid, useColorModeValue } from '@chakra-ui/react'
import Sidebar from '@/components/Sidebar'

type LayoutProps = {
  children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
  const bg = useColorModeValue('blue.200', 'blue.700')

  return (
    <Container maxW="container.lg" bg={bg} mt="3" p="3">
      <Head>
        <title>IPA Trainer</title>
      </Head>
      <Grid
        templateRows={{
          base: 'repeat(4, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
        templateColumns={'1fr 4fr'}
        gridTemplateAreas={{
          base: "'header header' 'main main' 'sidebar sidebar' 'footer footer'",
          md: "'header header' 'sidebar main' 'footer footer'",
        }}
        gap={4}
      >
        <Header gridArea="header" />
        <Sidebar gridArea="sidebar" />
        <Box as="main" gridArea="main">
          {children}
        </Box>
        <Footer gridArea="footer" />
      </Grid>
    </Container>
  )
}

export default Layout
