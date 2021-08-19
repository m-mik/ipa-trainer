import React from 'react'
import {
  Box,
  BoxProps,
  Button,
  ButtonGroup,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import Link from '@/common/components/Link'
import { GiTrophyCup } from 'react-icons/gi'
import { useRouter } from 'next/router'
import useLeaderboard from '../hooks/useLeaderboard'
import config from '@/common/config.json'

const {
  leaderboard: { usersPerPage },
} = config

function LeaderboardTable(props: BoxProps) {
  const router = useRouter()
  const page = Math.max(Number(router.query.page ?? 1), 1)
  const { data, isPreviousData } = useLeaderboard(page)

  const getTrophy = (position: number) => {
    const trophies = [
      { color: 'yellow.400', icon: GiTrophyCup },
      { color: 'gray.400', icon: GiTrophyCup },
      { color: 'yellow.700', icon: GiTrophyCup },
    ]
    if (position - 1 > trophies.length - 1) return null
    const { color, icon } = trophies[position - 1]
    return <Icon as={icon} color={color} w="5" h="5" />
  }

  const getUserPosition = (index: number) => {
    return page * usersPerPage - usersPerPage + index + 1
  }

  return (
    <Box {...props}>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Position</Th>
            <Th>Name</Th>
            <Th isNumeric>Points</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.users.map(({ id, name, points }, index) => (
            <Tr key={id}>
              <Td>
                #{getUserPosition(index)} {getTrophy(getUserPosition(index))}
              </Td>
              <Td>
                <Link href={`/user/${id}`}>{name}</Link>
              </Td>
              <Td isNumeric>{points}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <ButtonGroup variant="link" spacing="5" d="flex" alignItems="center">
        <Link href={`/leaderboard?page=${page - 1}`}>
          <Button disabled={page <= 1}>Previous</Button>
        </Link>
        <Box>{page}</Box>
        <Link href={`/leaderboard?page=${page + 1}`}>
          <Button disabled={isPreviousData || !data?.hasMore}>Next</Button>
        </Link>
      </ButtonGroup>
    </Box>
  )
}

export default LeaderboardTable
