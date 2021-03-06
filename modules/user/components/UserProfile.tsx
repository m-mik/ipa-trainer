import React, { useEffect, useRef } from 'react'
import {
  Box,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import useIntersection from 'react-use/lib/useIntersection'
import Error from '@/components/Error'
import UserAvatar from '@/components/UserAvatar'
import useColors from '@/hooks/useColors'
import Card from '@/components/Card'
import config from '@/common/config.json'
import Breadcrumb from '@/components/Breadcrumb'
import useUser from '../hooks/useUser'
import useInfiniteLessons from '../hooks/useInfiniteLessons'
import LessonPoints from './LessonPoints'
import { NextSeo } from 'next-seo'

const {
  lesson: { pointsPerCorrectAnswer },
} = config

type UserProfileProps = {
  userId: string
}

function UserProfile({ userId }: UserProfileProps) {
  const user = useUser(userId)
  const lessons = useInfiniteLessons(userId)
  const intersectionRef = useRef(null)
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '0px',
    threshold: 1,
  })

  const colors = {
    points: useColors('highlight'),
  }

  useEffect(() => {
    if (lessons.isFetching || lessons.isFetchingNextPage) return
    if (intersection?.isIntersecting && lessons.hasNextPage) {
      lessons.fetchNextPage()
    }
  }, [intersection, lessons])

  if (user.isLoading) return <Spinner />

  if (user.error?.response) {
    return <Error statusCode={user.error.response.data.code} />
  }

  if (!user.data) return null

  const { id, name, points, image } = user.data

  return (
    <>
      <NextSeo title={`${name}`} description={`${name}'s profile`} />
      <Breadcrumb
        items={{
          Home: '/',
          Leaderboard: '/leaderboard',
          [name]: `/user/${id}`,
        }}
      />
      <Card mt="5">
        <UserAvatar src={image} size="2xl" />
        <Text fontSize="2xl">{name}</Text>
        <Text fontWeight="bold" fontSize="lg" color={colors.points}>
          {points.toLocaleString()} points
        </Text>
        <Table variant="striped" mt="10">
          <Thead>
            <Tr>
              <Th>Lesson Date</Th>
              <Th>Points</Th>
            </Tr>
          </Thead>
          <Tbody>
            {lessons.data?.pages.map((page) => (
              <React.Fragment key={page.next}>
                {page.data?.map(({ id, createdAt, correct }) => (
                  <Tr key={id}>
                    <Td>
                      {formatDistanceToNow(new Date(createdAt), {
                        addSuffix: true,
                      })}
                    </Td>
                    <Td>
                      <LessonPoints value={correct * pointsPerCorrectAnswer} />
                    </Td>
                  </Tr>
                ))}
              </React.Fragment>
            ))}
          </Tbody>
        </Table>
        {lessons.isFetchingNextPage && <Spinner />}
        <Box ref={intersectionRef} />
      </Card>
    </>
  )
}

export default UserProfile
