import Image, { ImageProps } from 'next/image'
import usFlag from '@/public/images/united-states.svg'
import ukFlag from '@/public/images/united-kingdom.svg'

const flags = {
  UK: {
    name: 'United Kingdom',
    image: ukFlag,
  },
  US: {
    name: 'United States',
    image: usFlag,
  },
} as const

type FlagProps = Omit<ImageProps, 'src'> & {
  country: keyof typeof flags
}

function Flag({ country, ...rest }: FlagProps) {
  const { name, image } = flags[country]
  return (
    <Image
      src={image}
      alt={`${name.toUpperCase()} flag`}
      aria-label={`a flag of ${name.toUpperCase()}`}
      height="40px"
      width="40px"
      draggable="false"
      {...rest}
    />
  )
}

export default Flag
