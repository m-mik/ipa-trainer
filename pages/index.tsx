import { chakra, Container } from '@chakra-ui/react'
import { NextLayoutPage } from 'next'
import { motion } from 'framer-motion'
import Hero from '@/modules/home/components/Hero'

const MotionBox = motion(chakra.div)

const Home: NextLayoutPage = () => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return (
    <Container maxW="container.lg">
      <MotionBox
        initial="hidden"
        animate="visible"
        transition={{ duration: 1 }}
        variants={variants}
      >
        <Hero as="section" />
      </MotionBox>
    </Container>
  )
}

export default Home
