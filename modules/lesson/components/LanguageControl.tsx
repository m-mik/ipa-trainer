import { Box, BoxProps, Tooltip, VisuallyHidden } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { Language } from '@prisma/client'
import Flag from './Flag'

type LanguageControlProps = {
  selectedLanguage?: Language
  onLanguageChange?: (language: Language) => void
} & BoxProps

function LanguageControl({
  selectedLanguage = Language.US,
  onLanguageChange,
  ...rest
}: LanguageControlProps) {
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
        <VisuallyHidden>{selectedLanguage}</VisuallyHidden>
      </Box>
    </Tooltip>
  )
}

export default LanguageControl
