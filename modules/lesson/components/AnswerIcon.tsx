import { Icon, IconProps } from '@chakra-ui/react'
import { Answer } from '@prisma/client'
import { GiCheckMark } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'
import { VscDash } from 'react-icons/vsc'

type AnswerIconProps = IconProps & {
  type: Answer
}

function AnswerIcon({ type, ...rest }: AnswerIconProps) {
  const data = {
    [Answer.NONE]: {
      icon: VscDash,
      color: 'gray',
    },
    [Answer.CORRECT]: {
      icon: GiCheckMark,
      color: 'green',
    },
    [Answer.INCORRECT]: {
      icon: AiOutlineClose,
      color: 'red',
    },
  }

  const { icon, color } = data[type]

  return <Icon as={icon} color={color} {...rest} />
}

export default AnswerIcon
