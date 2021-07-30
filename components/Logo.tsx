import { Center, CenterProps, Icon, Text } from '@chakra-ui/react'
import useColors from '@/hooks/useColors'
import { IoMdSchool } from 'react-icons/io'

function Logo(props: CenterProps) {
  return (
    <Center {...props}>
      <Icon color={useColors('primary')} as={IoMdSchool} boxSize="10" mr="2" />
      <Text
        as="span"
        color={useColors('primary')}
        fontSize="1xl"
        fontWeight="600"
        d={{ base: 'none', xs: 'unset' }}
        {...props}
      >
        IPA Trainer
      </Text>
    </Center>
  )
}

export default Logo
