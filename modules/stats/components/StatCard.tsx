import {
  Box,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react'
import { IconType } from 'react-icons'
import useColors from '@/common/hooks/useColors'

type StatCardProps = {
  label: string
  count: number
  icon: IconType
}

function StatCard({ label, count, icon }: StatCardProps) {
  const Icon = icon
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py="5"
      shadow="xl"
      border="1px solid"
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded="lg"
    >
      <Flex justifyContent={'space-between'}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={'medium'} isTruncated>
            {label}
          </StatLabel>
          <StatNumber fontSize="2xl" fontWeight="medium">
            {count}
          </StatNumber>
        </Box>
        <Box my="auto" color={useColors('primary')} alignContent="center">
          <Icon size="3em" />
        </Box>
      </Flex>
    </Stat>
  )
}

export default StatCard
