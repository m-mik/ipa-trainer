import {
  Button,
  Flex,
  FlexProps,
  StackProps,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react'
import useColors from '@/hooks/useColors'

type KeyboardProps = StackProps & {
  onKeyClick?: (key: string) => void
  keyRows: KeyboardKey[][]
}

function Keyboard({ onKeyClick, keyRows, ...rest }: KeyboardProps) {
  const handleKeyClick = (key: string) => {
    onKeyClick?.(key)
  }

  return (
    <VStack p="2" bg={useColors('secondary')} d="inline-flex" {...rest}>
      <VStack spacing="2">
        <Flex justifyContent="center" wrap="wrap">
          {keyRows.map((keyboardKeys, index) => (
            <KeyRowBox
              key={index}
              keyboardKeys={keyboardKeys}
              onKeyClick={handleKeyClick}
            />
          ))}
        </Flex>
      </VStack>
    </VStack>
  )
}

type KeyRowBoxProps = {
  keyboardKeys: KeyboardKey[]
  onKeyClick?: (keyName: KeyboardKey['name']) => void
} & FlexProps

type KeyTooltipProps = {
  label: string
}

function KeyTooltip({ label }: KeyTooltipProps) {
  const found = label.match(/(.*)\[(.*)\](.*)/) ?? []
  const [_, left, center, right] = found

  return (
    <>
      {left}
      <Text as="strong" color={useColors('primary')}>
        {center}
      </Text>
      {right}
    </>
  )
}

function KeyRowBox({ keyboardKeys, onKeyClick, ...rest }: KeyRowBoxProps) {
  return (
    <Flex m="1" wrap="wrap" justifyContent="center" {...rest}>
      {keyboardKeys.map(({ name, tooltip }, index) => (
        <Tooltip
          key={`${name}${index}`}
          label={tooltip && <KeyTooltip label={tooltip} />}
          aria-label="Example word"
        >
          <Button
            m="1"
            variant="outline"
            px="0"
            py="0"
            fontSize="2em"
            onClick={(_) => onKeyClick?.(name)}
          >
            {name}
          </Button>
        </Tooltip>
      ))}
    </Flex>
  )
}

export interface KeyboardKey {
  name: string
  tooltip?: string
}

export default Keyboard
