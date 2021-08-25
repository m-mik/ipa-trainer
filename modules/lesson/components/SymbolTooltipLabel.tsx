import { TextProps } from '@chakra-ui/react'
import Emphasize from '@/components/Emphasize'

type SymbolTooltipLabelProps = TextProps & {
  text: string
}

function SymbolTooltipLabel({ text, ...rest }: SymbolTooltipLabelProps) {
  const found = text.match(/(.*)\[(.*)\](.*)/) ?? []
  const [_, left, center, right] = found

  return (
    <>
      {left}
      <Emphasize text={center} {...rest} />
      {right}
    </>
  )
}

export default SymbolTooltipLabel
