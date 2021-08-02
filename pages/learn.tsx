import {
  Box,
  Container,
  Spinner,
  useOutsideClick,
  VStack,
} from '@chakra-ui/react'
import { NextLayoutPage } from 'next'
import React, { useCallback, useState } from 'react'
import dynamic from 'next/dynamic'
import useLesson from '@/hooks/useLesson'
import Keyboard from '@/components/Keyboard'
import LangControl from '@/components/LangControl'
import IPA, { Alphabet, Character, Lang } from '@/lib/IPA'

const CharacterPanel = dynamic(() => import('@/components/CharacterPanel'), {
  ssr: false,
})

const Learn: NextLayoutPage = () => {
  const ref = React.useRef<HTMLDivElement>(null)
  useOutsideClick({
    ref,
    handler: (props) => {
      setTimeout(() => setActiveCharIndex(null), 0)
    },
  })
  const [activeCharIndex, setActiveCharIndex] = useState<null | number>(null)
  const [lang, setLang] = useState<Lang>('us')
  const [characters, setCharacters] = useState(['a', 'b'])
  const { isLoading, data } = useLesson()

  console.log(data)

  const handleKeyClick = (key: string) => {
    if (activeCharIndex === null) {
      setCharacters((prevCharacters) => [...prevCharacters, key])
    } else {
      setCharacters(
        characters.map((character, index) =>
          index === activeCharIndex ? key : character
        )
      )
      setActiveCharIndex(null)
    }
  }

  const handleCharacterClick = (character: string, index: number) => {
    if (activeCharIndex === index) {
      setActiveCharIndex(null)
    } else {
      setActiveCharIndex(index)
    }
  }

  const handleCharacterRightClick = (key: string, index: number) => {
    setCharacters((prevCharacters) =>
      prevCharacters.filter((_, i) => i !== index)
    )
    const active = activeCharIndex
    if (active === null) return
    else if (active === index) setActiveCharIndex(null)
    else if (index < active) setActiveCharIndex(active - 1)
  }

  const handleCharacterDrop = useCallback(
    ({ source, destination }) => {
      if (!destination || source.index === destination.index) return
      const newCharacters = [...characters]
      newCharacters.splice(source.index, 1)
      newCharacters.splice(destination.index, 0, characters[source.index])
      setCharacters(newCharacters)
      const newActiveCharIndex = calculateCharDropActiveIndex({
        active: activeCharIndex,
        source: source.index,
        destination: destination.index,
      })
      setActiveCharIndex(newActiveCharIndex)
    },
    [characters, activeCharIndex]
  )

  const handleLangChange = (lang: Lang) => {
    setLang(lang)
    setActiveCharIndex(null)
    setCharacters([])
  }

  return (
    <Container maxW="container.lg">
      <VStack onContextMenu={(e) => e.preventDefault()}>
        {isLoading && <Spinner />}
        <Box ref={ref}>
          <CharacterPanel
            characters={characters}
            activeCharIndex={activeCharIndex}
            onCharacterClick={handleCharacterClick}
            onCharacterDrop={handleCharacterDrop}
            onCharacterRightClick={handleCharacterRightClick}
          />
        </Box>
        <Keyboard keyRows={KEY_ROWS[lang]} onKeyClick={handleKeyClick} />
        <LangControl selectedLang={lang} onLangChange={handleLangChange} />
      </VStack>
    </Container>
  )
}

type calculateCharDropActiveIndexProps = {
  active: number | null
  source: number
  destination: number
}

export function calculateCharDropActiveIndex({
  active,
  source,
  destination,
}: calculateCharDropActiveIndexProps) {
  if (active === null) return active
  else if (source !== active && destination !== active) return active
  else if (source === active) return destination
  else if (source > active) return active + 1
  else if (source < active) return active - 1
  else return active
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
    keyRow
      .filter((character) => isGeneralKey(character) || character.lang === lang)
      .map((character) => ({ ...character, tooltip: character.example }))
  ) as Character[][]
}

export const KEY_ROWS: KeyRow = {
  us: createKeyRows(IPA, 'us'),
  uk: createKeyRows(IPA, 'uk'),
}

export type KeyRow = {
  [key in Lang]: Character[][]
}

export default Learn
