import { chakra, Container } from '@chakra-ui/react'
import { NextLayoutPage } from 'next'
import { motion } from 'framer-motion'
import { NextSeo } from 'next-seo'
import Hero from '@/modules/home/components/Hero'
import Stats from '@/modules/stats/components/Stats'

const MotionBox = motion(chakra.div)

const Home: NextLayoutPage = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
        duration: 1.5,
      },
    },
  }

  const item = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return (
    <>
      <NextSeo titleTemplate="%s" title="IPA Trainer" />
      <Container maxW="container.lg">
        <MotionBox
          initial="hidden"
          animate="visible"
          transition={{ duration: 1 }}
          variants={container}
        >
          <MotionBox variants={item} mt={[0, 10]}>
            <Hero as="section" />
          </MotionBox>
          <MotionBox variants={item} mt="20">
            <Stats as="section" />
          </MotionBox>
        </MotionBox>
      </Container>
    </>
  )
}

export default Home
