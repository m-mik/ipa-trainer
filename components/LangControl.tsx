import { Box, BoxProps, Tooltip, VisuallyHidden } from '@chakra-ui/react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import usFlag from '@/public/images/united-states.svg'
import ukFlag from '@/public/images/united-kingdom.svg'
import { Lang } from '@/lib/IPA'

type Image = {
  src: string
}

type LangItem = {
  value: string
  image: Image
}

const languages: Record<Lang, LangItem> = {
  us: {
    value: 'us',
    image: usFlag,
  },
  uk: {
    value: 'uk',
    image: ukFlag,
  },
}

type LangControlProps = {
  selectedLang: Lang
  onLangChange?: (ipaLang: Lang) => void
} & BoxProps

function LangControl({
  selectedLang = 'us',
  onLangChange,
  ...rest
}: LangControlProps) {
  const { image, value } = languages[selectedLang]

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onLangChange?.(selectedLang === 'us' ? 'uk' : 'us')
  }

  return (
    <Tooltip label="Change language" aria-label="Change language">
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
            aria-label="Change language"
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

export default LangControl
