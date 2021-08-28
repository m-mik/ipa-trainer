import { Flex, Spinner, StackProps } from '@chakra-ui/react'
import { BsPerson } from 'react-icons/bs'
import { AiOutlineDatabase } from 'react-icons/ai'
import { GiSpeaker, GiTeacher } from 'react-icons/gi'
import { RiQuestionAnswerLine } from 'react-icons/ri'
import StatCard from './StatCard'
import useStats from '../hooks/useStats'

type StatsProps = StackProps & {}

function Stats(props: StatsProps) {
  const { data, isLoading } = useStats()

  if (isLoading) return <Spinner />

  if (!data) return null

  const { users, lessons, answers, words, pronunciations } = data

  const items = [
    {
      label: 'Users',
      icon: BsPerson,
      count: users,
    },
    {
      label: 'Lessons',
      icon: GiTeacher,
      count: lessons,
    },
    {
      label: 'Answers',
      icon: RiQuestionAnswerLine,
      count: answers.correct + answers.incorrect,
    },
    {
      label: 'Words',
      icon: AiOutlineDatabase,
      count: words,
    },
    {
      label: 'Pronunciations',
      icon: GiSpeaker,
      count: pronunciations,
    },
  ]

  return (
    <Flex
      spacing="5"
      direction={['column', 'row']}
      wrap="wrap"
      justifyContent="center"
      {...props}
    >
      {items.map(({ label, icon, count }) => (
        <StatCard
          key={label}
          count={count}
          icon={icon}
          label={label}
          minW={['0', '200px']}
          flexBasis={['100%', '25%']}
          m="2"
        />
      ))}
    </Flex>
  )
}

export default Stats
