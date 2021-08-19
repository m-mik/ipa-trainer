import React, { useEffect, useRef } from 'react'
import { Box, Spinner, Text } from '@chakra-ui/react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import useIntersection from 'react-use/lib/useIntersection'
import useUser from '../hooks/useUser'
import Error from '@/components/Error'
import UserAvatar from '@/components/UserAvatar'
import useColors from '@/hooks/useColors'
import Card from '@/components/Card'
import useInfiniteLessons from '../hooks/useInfiniteLessons'

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

  const { name, points, image } = user.data

  return (
    <Card>
      <UserAvatar src={image} size="2xl" />
      <Text fontSize="2xl">{name}</Text>
      <Text fontWeight="bold" fontSize="lg" color={colors.points}>
        {points.toLocaleString()} points
      </Text>
      <Text>Lessons:</Text>
      {lessons.data?.pages.map((page) => (
        <React.Fragment key={page.next}>
          {page.data?.map(({ id, createdAt }) => (
            <Box key={id}>
              {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
            </Box>
          ))}
        </React.Fragment>
      ))}

      {lessons.isFetchingNextPage && <Spinner />}
      <Box ref={intersectionRef} />
    </Card>
  )
}

export default UserProfile
