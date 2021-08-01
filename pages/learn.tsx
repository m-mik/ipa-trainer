import { Container, Spinner, VStack } from '@chakra-ui/react'
import { NextLayoutPage } from 'next'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import useLesson from '@/hooks/useLesson'
import Keyboard from '@/components/Keyboard'
import LangControl from '@/components/LangControl'
import IPA, { Alphabet, Character, Lang } from '@/lib/IPA'
const CharactersPanel = dynamic(() => import('@/components/CharacterPanel'), {
  ssr: false,
})

const Learn: NextLayoutPage = () => {
  const { isLoading, data } = useLesson()
  const [lang, setLang] = useState<Lang>('us')
  const [characters, setCharacters] = useState(['a', 'b', 'c'])

  if (isLoading) return <Spinner />
  console.log(data)

  const handleKeyClick = (key: string) => {
    setCharacters((prevCharacters) => [...prevCharacters, key])
  }

  const handleCharacterClick = (character: string, index: number) => {
    setCharacters((prevCharacters) =>
      prevCharacters.filter((_, i) => i !== index)
    )
  }

  const handleLangChange = (lang: Lang) => {
    setLang(lang)
    setCharacters([])
  }

  return (
    <Container maxW="container.lg">
      <VStack>
        <CharactersPanel
          characters={characters}
          onCharactersChange={setCharacters}
          onCharacterClick={handleCharacterClick}
        />
        <Keyboard keyRows={KEY_ROWS[lang]} onKeyClick={handleKeyClick} />
        <LangControl selectedLang={lang} onLangChange={handleLangChange} />
      </VStack>
    </Container>
  )
}

export function createKeyRows(alphabet: Alphabet, lang: Lang) {
  const isGeneralKey = (character: Character) =>
    typeof character.lang === 'undefined'
  const { vowels, consonants, diphthongs, other } = alphabet
  return [
    [
      ...vowels.long,
      ...vowels.short,
      ...consonants.voiced,
      ...consonants.voiceless,
      ...diphthongs,
      ...other,
    ],
  ].map((keyRow) =>
    keyRow.filter(
      (character) => isGeneralKey(character) || character.lang === lang
    )
  )
}

export const KEY_ROWS: KeyRow = {
  us: createKeyRows(IPA, 'us'),
  uk: createKeyRows(IPA, 'uk'),
}

export type KeyRow = {
  [key in Lang]: Character[][]
}

export default Learn
