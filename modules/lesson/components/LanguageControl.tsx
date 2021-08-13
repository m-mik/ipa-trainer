import { Box, BoxProps, Tooltip, VisuallyHidden } from '@chakra-ui/react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import usFlag from '@/public/images/united-states.svg'
import ukFlag from '@/public/images/united-kingdom.svg'
import { Language } from '@prisma/client'
import Flag from './Flag'

type Image = {
  src: string
}

type LanguageData = { [key in Language]: { value: Language; image: Image } }

const languageData: LanguageData = {
  [Language.US]: {
    value: Language.US,
    image: usFlag,
  },
  [Language.UK]: {
    value: Language.UK,
    image: ukFlag,
  },
}

type LanguageControlProps = {
  selectedLanguage: Language
  onLanguageChange?: (language: Language) => void
} & BoxProps

function LanguageControl({
  selectedLanguage = Language.US,
  onLanguageChange,
  ...rest
}: LanguageControlProps) {
  const { image, value } = languageData[selectedLanguage]

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onLanguageChange?.(
      selectedLanguage === Language.US ? Language.UK : Language.US
    )
  }

  return (
    <Tooltip label="Change language" aria-label="Change language">
      <Box
        w="30px"
        h="30px"
        cursor="pointer"
        onClick={handleClick}
        _hover={{ scale: 1.5 }}
        {...rest}
      >
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Flag country={selectedLanguage} />
        </motion.div>
        <VisuallyHidden>{value}</VisuallyHidden>
      </Box>
    </Tooltip>
  )
}

export default LanguageControl
