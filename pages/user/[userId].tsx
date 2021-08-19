import { NextLayoutPage } from 'next'
import { Container } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import UserProfile from '@/modules/leaderboard/components/UserProfile'

const User: NextLayoutPage = () => {
  const router = useRouter()
  const userId = router.query.userId as string

  return (
    <Container maxW="container.lg" mb="5em">
      {userId && <UserProfile userId={userId} />}
    </Container>
  )
}

export default User
