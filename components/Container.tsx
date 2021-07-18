import { Flex, FlexProps } from '@chakra-ui/react'

type ContainerProps = FlexProps

function Container(props: ContainerProps) {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      bg="blue.200"
      color="white"
      {...props}
    />
  )
}

export default Container
