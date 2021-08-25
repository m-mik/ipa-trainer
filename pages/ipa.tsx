import {
  Box,
  Container,
  Heading,
  HStack,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { NextLayoutPage } from 'next'
import React from 'react'
import { Language } from '@prisma/client'
import IPA from '@/data/IPA'
import { getAlphabetSymbols } from '@/modules/lesson/utils'
import LanguageControl from '@/modules/lesson/components/LanguageControl'
import SymbolTooltipLabel from '@/modules/lesson/components/SymbolTooltipLabel'
import Audio from '@/modules/lesson/components/Audio'
import useLessonUi from '../modules/lesson/hooks/useLessonUi'
import { ActionType } from '../modules/lesson/store/lessonUiActions'

const getAudioSrc = (name: string, language: Language) => {
  const baseUrl = 'https://lex-audio.useremarkable.com/mp3'
  const defaultAudioId = {
    US: `${name}__us_1`,
    UK: `${name}__gb_1`,
  }
  const audioIds: Record<string, { UK: string; US: string }> = {
    ship: { UK: 'ship__gb_1', US: '_ship_1_us_1' },
    head: { UK: '_head_1_gb_1', US: 'head_1_us_1' },
    moon: { UK: 'moon_1_gb_1', US: 'moon_1_us_1' },
    think: { UK: 'think__gb_1', US: '_think_1_us_1' },
    hat: { UK: 'hat__gb_3', US: 'hat__us_2' },
    yes: { UK: 'yes__gb_1', US: 'yes__us_2' },
    cheese: { UK: 'cheese__gb_3', US: 'cheese__us_2' },
    butter: { UK: 'butter__gb_1', US: 'butter__us_2' },
    hair: { UK: 'hair__gb_1_8', US: 'hair__us_1' },
    run: { UK: 'run__gb_3', US: 'run__us_1' },
    she: { UK: 'she__gb_3', US: 'she__us_1' },
    influenza: { UK: 'influenza__gb_1_8', US: 'influenza__us_1' },
  }
  const audioId = audioIds[name]?.[language] ?? defaultAudioId[language]
  return `${baseUrl}/${audioId}.mp3`
}

const Ipa: NextLayoutPage = () => {
  const {
    dispatch,
    state: { language },
  } = useLessonUi()
  const symbols = getAlphabetSymbols(IPA, language)

  const handleLanguageChange = (language: Language) => {
    dispatch({ type: ActionType.SetLanguage, language })
  }

  return (
    <Container maxW="container.lg">
      <Heading as="h2">International Phonetic Alphabet </Heading>
      <HStack mb="5">
        <Box>Language: </Box>
        <LanguageControl
          selectedLanguage={language}
          onLanguageChange={handleLanguageChange}
        />
      </HStack>
      <Table variant="striped">
        <TableCaption>International Phonetic Alphabet</TableCaption>
        <Thead>
          <Tr>
            <Th>Symbol</Th>
            <Th>Example</Th>
            <Th>Audio</Th>
          </Tr>
        </Thead>
        <Tbody>
          {symbols.map(({ id, name, example }) => (
            <Tr key={id}>
              <Td>{name}</Td>
              <Td>{example && <SymbolTooltipLabel text={example} />}</Td>
              <Td>
                {example && (
                  <Audio
                    src={getAudioSrc(example.replace(/[\[\]]/g, ''), language)}
                    autoPlay={false}
                  />
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Container>
  )
}

export default Ipa