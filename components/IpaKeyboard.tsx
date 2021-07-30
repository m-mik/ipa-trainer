import { Box, Button, VStack } from '@chakra-ui/react'
import IpaLangControl from '@/components/IpaLangControl'
import { useCallback, useState } from 'react'
import { IpaLang } from '@/lib/wordInfo/service'
import useColors from '@/hooks/useColors'

type IpaKeyboardProps = {
  onKeyPress?: () => void //todo
}

function IpaKeyboard(props: IpaKeyboardProps) {
  const [ipaLang, setIpaLang] = useState<IpaLang>('us')

  const handleIpaLangChange = useCallback(
    (ipaLang: IpaLang) => {
      setIpaLang(ipaLang)
    },
    [setIpaLang]
  )

  const handleKeyClick = (key: string) => {
    console.log(key)
  }

  return (
    <Box p="2" bg={useColors('secondary')} d="inline-flex">
      <Box>
        <IpaLangControl
          selectedLang={ipaLang}
          onLangChange={handleIpaLangChange}
        />
        {ipaLang}
      </Box>
      <VStack spacing="2">
        {GENERAL_KEYS.map((row, index) => (
          <Box key={index}>
            {row.map((generalKey) => (
              <Button
                key={generalKey}
                m="0.5"
                variant="outline"
                onClick={(_) => handleKeyClick(generalKey)}
              >
                {generalKey}
              </Button>
            ))}
          </Box>
        ))}
      </VStack>
    </Box>
  )
}

export const GENERAL_KEYS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ':', "'"],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', '.'],
]

export const IPA_KEYS = {
  us: ['@', '@'],
  uk: ['%', '!'],
}

export default IpaKeyboard
