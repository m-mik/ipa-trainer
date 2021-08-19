import { Text, TextProps } from '@chakra-ui/react'
import useColors from '@/hooks/useColors'

type LessonPointsProps = TextProps & {
  value: number
}

function LessonPoints({ value, ...rest }: LessonPointsProps) {
  const colors = {
    default: useColors('fg'),
    positive: useColors('highlight'),
  }

  return (
    <Text
      as="span"
      color={value > 0 ? colors.positive : colors.default}
      {...rest}
    >
      {value > 0 && '+'}
      {value}
    </Text>
  )
}

export default LessonPoints
