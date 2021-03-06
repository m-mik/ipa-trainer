import { Box, Grid } from '@chakra-ui/react'
import Footer from './Footer'
import Header from './Header'
import useLoadSettings from '@/modules/lesson/hooks/useLoadSettings'
import usePersistSettings from '@/modules/lesson/hooks/usePersistSettings'

type DefaultLayoutProps = {
  children: React.ReactNode
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  useLoadSettings()
  usePersistSettings()

  return (
    <>
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
        <Box gridArea="content" as="main" mt={['30px', '80px']}>
          {children}
        </Box>
        <Footer gridArea="footer" />
      </Grid>
    </>
  )
}

export default DefaultLayout
