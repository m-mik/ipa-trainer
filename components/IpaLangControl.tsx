import { Box, BoxProps, VisuallyHidden } from '@chakra-ui/react'
import { IpaLang } from '@/lib/wordInfo/service'
import { useState } from 'react'
import Image from 'next/image'
import usFlag from '@/public/images/united-states.svg'
import ukFlag from '@/public/images/united-kingdom.svg'

type IpaLangControlProps = {
  lang?: IpaLang
  onChange?: (lang: IpaLang) => void
} & BoxProps

function IpaLangControl({
  lang = 'us',
  onChange,
  ...restProps
}: IpaLangControlProps) {
  const [ipaLang, setIpaLang] = useState<IpaLang>(lang)

  const languages = {
    us: {
      value: 'us',
      image: usFlag,
    },
    uk: {
      value: 'uk',
      image: ukFlag,
    },
  }

  const { image, value } = languages[ipaLang]

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setIpaLang((prevIpaLang) => (prevIpaLang === 'us' ? 'uk' : 'us'))
    onChange?.(ipaLang)
  }

  return (
    <Box
      w="40px"
      h="40px"
      cursor="pointer"
      onClick={handleClick}
      {...restProps}
    >
      <Image
        src={image.src}
        alt={`${value.toUpperCase()} flag`}
        aria-label="Change IPA language"
        height="40px"
        width="40px"
        draggable="false"
      />
      <VisuallyHidden>{value}</VisuallyHidden>
    </Box>
  )
}

export default IpaLangControl
