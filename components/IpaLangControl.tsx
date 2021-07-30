import { Box, BoxProps, Tooltip, VisuallyHidden } from '@chakra-ui/react'
import { IpaLang } from '@/lib/wordInfo/service'
import Image from 'next/image'
import usFlag from '@/public/images/united-states.svg'
import ukFlag from '@/public/images/united-kingdom.svg'
import { motion } from 'framer-motion'

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

type IpaLangControlProps = {
  selectedLang: IpaLang
  onLangChange?: (ipaLang: IpaLang) => void
} & BoxProps

function IpaLangControl({
  selectedLang = 'us',
  onLangChange,
  ...rest
}: IpaLangControlProps) {
  const { image, value } = languages[selectedLang]

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onLangChange?.(selectedLang === 'us' ? 'uk' : 'us')
  }

  return (
    <Tooltip label="Change IPA language" aria-label="Change IPA language">
      <Box
        w="40px"
        h="40px"
        cursor="pointer"
        onClick={handleClick}
        _hover={{ scale: 1.5 }}
        {...rest}
      >
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Image
            src={image.src}
            alt={`${value.toUpperCase()} flag`}
            aria-label="Change IPA language"
            height="40px"
            width="40px"
            draggable="false"
          />
        </motion.div>
        <VisuallyHidden>{value}</VisuallyHidden>
      </Box>
    </Tooltip>
  )
}

export default IpaLangControl
