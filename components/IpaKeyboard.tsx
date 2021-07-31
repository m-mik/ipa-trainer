import { Box, Button, Flex, FlexProps, VStack } from '@chakra-ui/react'
import IpaLangControl from '@/components/IpaLangControl'
import { useCallback, useEffect, useMemo, useState } from 'react'
import useColors from '@/hooks/useColors'

type IpaKeyboardProps = {
  onKeyPress?: () => void
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

  const keyTypes = useMemo(() => {
    const { vowels, consonants, diphthongs, other } = IPA_KEYS_LANG[ipaLang]
    return [
      vowels.long,
      vowels.short,
      consonants.voiced.slice(0, 7),
      consonants.voiced.slice(7),
      consonants.voiceless,
      diphthongs,
      other,
    ]
  }, [ipaLang])

  return (
    <VStack p="2" bg={useColors('secondary')} d="inline-flex">
      <Box>
        <IpaLangControl
          selectedLang={ipaLang}
          onLangChange={handleIpaLangChange}
        />
      </Box>

      <VStack spacing="2">
        <Flex justifyContent="center" wrap="wrap">
          {keyTypes.map((keyType, index) => (
            <KeyRow key={index} ipaKeys={keyType} />
          ))}
        </Flex>
      </VStack>
    </VStack>
  )
}

type KeyRowProps = {
  ipaKeys: IpaKey[]
  onKeyClick?: (ipaKey: IpaKey['name']) => void
} & FlexProps

function KeyRow({ ipaKeys, onKeyClick, ...rest }: KeyRowProps) {
  return (
    <Flex m="1" {...rest}>
      {ipaKeys.map(({ name, example }) => (
        <Button
          key={name}
          m="1"
          variant="outline"
          px="0"
          py="0"
          fontSize="2em"
          onClick={(_) => onKeyClick?.(name)}
        >
          {name}
        </Button>
      ))}
    </Flex>
  )
}

export type IpaLang = 'us' | 'uk'

export interface IpaKey {
  name: string
  example: string
  lang?: IpaLang
}

export interface Vowels {
  long: IpaKey[]
  short: IpaKey[]
}

export interface Consonants {
  voiced: IpaKey[]
  voiceless: IpaKey[]
}

export interface Other extends Array<IpaKey> {}

export interface Diphthongs extends Array<IpaKey> {}

export interface IpaKeys {
  vowels: Vowels
  consonants: Consonants
  diphthongs: Diphthongs
  other: Other
}

export const IPA_KEYS: IpaKeys = {
  vowels: {
    long: [
      { name: 'iː', example: 'sh[ee]p' },
      { name: 'ɑː', example: 'f[a]rm' },
      { name: 'uː', example: 'c[oo]' },
      { name: 'ɔː', example: 'h[o]rse' },
      { name: 'ɜː', example: 'b[i]rd' },
    ],
    short: [
      { name: 'ɪ', example: 'sh[i]p' },
      { name: 'æ', example: 'h[a]t' },
      { name: 'ʊ', example: 'f[oo]t' },
      { name: 'ɒ', example: 's[o]ck', lang: 'uk' },
      { name: 'ʌ', example: 'c[u]p' },
      { name: 'e', example: 'h[ea]d' },
      { name: 'ə', example: '[a]bove' },
      { name: 'ɚ', example: 'moth[er]', lang: 'us' },
      { name: 'ɝ', example: 'w[or]m', lang: 'us' },
    ],
  },
  consonants: {
    voiced: [
      { name: 'b', example: '[b]ook' },
      { name: 'd', example: '[d]ay' },
      { name: 'ɡ', example: '[g]ive' },
      { name: 'v', example: '[v]ery' },
      { name: 'ð', example: '[th]e' },
      { name: 'z', example: '[z]oo' },
      { name: 'ʒ', example: 'vi[s]ion' },
      { name: 'dʒ', example: '[j]ump' },
      { name: 'l', example: '[l]ook' },
      { name: 'r', example: '[r]un' },
      { name: 'j', example: '[y]es' },
      { name: 'w', example: '[w]e' },
      { name: 'm', example: '[m]oon' },
      { name: 'n', example: '[n]ame' },
      { name: 'ŋ', example: 'si[n]g' },
    ],
    voiceless: [
      { name: 'p', example: '[p]en' },
      { name: 't', example: '[t]own' },
      { name: 'k', example: '[c]at' },
      { name: 'f', example: '[f]ish' },
      { name: 'θ', example: '[th]ink' },
      { name: 's', example: '[s]ay' },
      { name: 'ʃ', example: '[sh]e' },
      { name: 'tʃ', example: '[ch]eese' },
    ],
  },
  diphthongs: [
    { name: 'eɪ', example: 'd[ay]' },
    { name: 'aɪ', example: '[eye]' },
    { name: 'ɔɪ', example: 'b[oy]' },
    { name: 'aʊ', example: 'm[ou]th' },
    { name: 'əʊ', example: 'n[o]se', lang: 'uk' },
    { name: 'oʊ', example: 'n[o]se', lang: 'us' },
    { name: 'ɪə', example: '[ea]r', lang: 'uk' },
    { name: 'eə', example: 'h[air]', lang: 'uk' },
    { name: 'ʊə', example: 'p[ure]', lang: 'uk' },
  ],
  other: [
    { name: 'h', example: '[h]and' },
    { name: 'ɒ', example: 'croiss[ant]', lang: 'uk' },
    { name: 'i', example: 'happ[y]' },
    { name: 't̬', example: 'bu[tt]er', lang: 'us' },
    { name: 'u', example: 'infl[u]enza' },
    { name: 'l̩', example: 'litt[le]' },
  ],
}

export function filterIpaKeys(
  ipaKeys: IpaKeys,
  predicate: (value: IpaKey) => boolean
) {
  return {
    ...ipaKeys,
    vowels: {
      short: ipaKeys.vowels.short.filter(predicate),
      long: ipaKeys.vowels.long,
    },
    diphthongs: ipaKeys.diphthongs.filter(predicate),
    other: ipaKeys.other.filter(predicate),
  } as IpaKeys
}

export const isGeneralIpaKey = (ipaKey: IpaKey) =>
  typeof ipaKey.lang === 'undefined'

export const IPA_KEYS_LANG = {
  us: filterIpaKeys(
    IPA_KEYS,
    (ipaKey) => isGeneralIpaKey(ipaKey) || ipaKey.lang === 'us'
  ),
  uk: filterIpaKeys(
    IPA_KEYS,
    (ipaKey) => isGeneralIpaKey(ipaKey) || ipaKey.lang === 'uk'
  ),
}

export default IpaKeyboard
