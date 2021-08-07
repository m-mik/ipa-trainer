import { Text, TextProps } from '@chakra-ui/react'
import useColors from '../../../common/hooks/useColors'

type SymbolTooltipLabelProps = TextProps & {
  text: string
}

function SymbolTooltipLabel({ text, ...rest }: SymbolTooltipLabelProps) {
  const found = text.match(/(.*)\[(.*)\](.*)/) ?? []
  const [_, left, center, right] = found

  return (
    <>
      {left}
      <Text as="strong" color={useColors('primary')} {...rest}>
        {center}
      </Text>
      {right}
    </>
  )
}

export default SymbolTooltipLabel
