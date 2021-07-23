import { Button, Container, Stack, Text } from '@chakra-ui/react'
import { NextLayoutPage } from 'next'
import Hero from '@/components/Hero'

const Home: NextLayoutPage = () => {
  return (
    <Container maxW="container.lg">
      <Hero as="section" />
      <Stack direction="row" spacing={4} align="center">
        <Button variant="solid">Button</Button>
        <Button variant="outline">Button</Button>
        <Button variant="ghost">Button</Button>
        <Button variant="link">Button</Button>
      </Stack>

      <Text mb="5">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque est ex
        explicabo maiores quod, sapiente vel? Aliquid animi, architecto
        distinctio dolor, dolore dolorum eligendi error et fuga fugiat harum id
        officia pariatur perferendis quae reiciendis sunt unde. Beatae
        consectetur dolores esse ex fuga harum, magnam non, quae quia rem rerum
        totam ut. A accusamus, aliquid asperiores aspernatur commodi corporis
        deleniti deserunt dicta dolore dolorum est et eum eveniet explicabo
        illum itaque labore laborum modi mollitia nam necessitatibus nihil nulla
        odio perspiciatis provident quasi qui quia quod rerum sit temporibus ut
        veritatis vitae voluptas voluptatem voluptates voluptatum! Aspernatur
        excepturi iste quibusdam?
      </Text>
      <Text mb="5">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque est ex
        explicabo maiores quod, sapiente vel? Aliquid animi, architecto
        distinctio dolor, dolore dolorum eligendi error et fuga fugiat harum id
        officia pariatur perferendis quae reiciendis sunt unde. Beatae
        consectetur dolores esse ex fuga harum, magnam non, quae quia rem rerum
        totam ut. A accusamus, aliquid asperiores aspernatur commodi corporis
        deleniti deserunt dicta dolore dolorum est et eum eveniet explicabo
        illum itaque labore laborum modi mollitia nam necessitatibus nihil nulla
        odio perspiciatis provident quasi qui quia quod rerum sit temporibus ut
        veritatis vitae voluptas voluptatem voluptates voluptatum! Aspernatur
        excepturi iste quibusdam?
      </Text>
      <Text mb="5">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque est ex
        explicabo maiores quod, sapiente vel? Aliquid animi, architecto
        distinctio dolor, dolore dolorum eligendi error et fuga fugiat harum id
        officia pariatur perferendis quae reiciendis sunt unde. Beatae
        consectetur dolores esse ex fuga harum, magnam non, quae quia rem rerum
        totam ut. A accusamus, aliquid asperiores aspernatur commodi corporis
        deleniti deserunt dicta dolore dolorum est et eum eveniet explicabo
        illum itaque labore laborum modi mollitia nam necessitatibus nihil nulla
        odio perspiciatis provident quasi qui quia quod rerum sit temporibus ut
        veritatis vitae voluptas voluptatem voluptates voluptatum! Aspernatur
        excepturi iste quibusdam?
      </Text>
    </Container>
  )
}

export default Home
