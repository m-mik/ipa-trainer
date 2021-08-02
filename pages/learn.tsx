import {
  Box,
  Container,
  Spinner,
  useOutsideClick,
  VStack,
} from '@chakra-ui/react'
import { NextLayoutPage } from 'next'
import React, { useCallback, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import useLesson from '@/hooks/useLesson'
import Keyboard from '@/components/Keyboard'
import LangControl from '@/components/LangControl'
import IPA, { Alphabet, Character, Lang } from '@/lib/IPA'
import { addToArray, removeByIndex, updateByIndex } from '@/lib/utils/array'

const CharacterPanel = dynamic(() => import('@/components/CharacterPanel'), {
  ssr: false,
})

const Learn: NextLayoutPage = () => {
  const ref = React.useRef<HTMLDivElement>(null)
  useOutsideClick({
    ref,
    handler: (_) => setTimeout(() => setActiveCharIndex(null), 0),
  })
  const [activeCharIndex, setActiveCharIndex] = useState<null | number>(null)
  const [lang, setLang] = useState<Lang>('us')
  const [characters, setCharacters] = useState(['a', 'b'])
  const { isLoading, data } = useLesson()
  const DELETE_KEY = '🗑'
  const keyRows = KEY_ROWS[lang]
  console.log(data)

  const addCharacter = (character: string) =>
    setCharacters((prevChars) => addToArray(prevChars, character))

  const removeCharacter = (index: number) =>
    setCharacters((prevChars) => removeByIndex(prevChars, index))

  const updateCharacter = (character: string, index: number) =>
    setCharacters((prevChars) => updateByIndex(prevChars, index, character))

  const handleKeyClick = (key: string) => {
    if (key === DELETE_KEY) handleDeleteKeyClick()
    else if (activeCharIndex === null) addCharacter(key)
    else {
      updateCharacter(key, activeCharIndex)
      setActiveCharIndex(null)
    }
  }

  const handleDeleteKeyClick = () => {
    if (activeCharIndex !== null) {
      removeCharacter(activeCharIndex)
    } else if (characters.length) {
      const destination = characters.length - 1
      removeCharacter(destination)
    }
    setActiveCharIndex(null)
  }

  const handleCharacterClick = (character: string, index: number) => {
    if (activeCharIndex === index) {
      setActiveCharIndex(null)
    } else {
      setActiveCharIndex(index)
    }
  }

  const handleCharacterRightClick = (key: string, index: number) => {
    removeCharacter(index)
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

  const keyRowsWithDelete = useMemo(() => {
    const deleteCharKey = { name: DELETE_KEY }
    return [[...keyRows[0], deleteCharKey]]
  }, [keyRows])

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
        <Keyboard keyRows={keyRowsWithDelete} onKeyClick={handleKeyClick} />
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
