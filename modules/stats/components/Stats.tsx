import { Spinner, Stack, StackProps } from '@chakra-ui/react'
import { BsPerson } from 'react-icons/bs'
import { AiOutlineDatabase } from 'react-icons/ai'
import { RiQuestionAnswerLine } from 'react-icons/ri'
import StatCard from './StatCard'
import useStats from '../hooks/useStats'

type StatsProps = StackProps & {}

function Stats(props: StatsProps) {
  const { data, isLoading } = useStats()

  if (isLoading) return <Spinner />

  if (!data) return null

  const { users, answers, words } = data

  return (
    <Stack spacing="5" {...props} direction={['column', 'row']}>
      <StatCard count={users} icon={BsPerson} label="Users" />
      <StatCard count={words} icon={AiOutlineDatabase} label="Words" />
      <StatCard
        count={answers.correct + answers.incorrect}
        icon={RiQuestionAnswerLine}
        label="Answers"
      />
    </Stack>
  )
}

export default Stats
