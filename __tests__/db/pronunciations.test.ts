import prisma from '@/common/db'
import { getAlphabetSymbols, symbolsToArray } from '@/modules/lesson/utils'
import IPA from '@/data/IPA'
import { Language } from '@prisma/client'

describe('database pronunciations', () => {
  let keys: Record<Language, Set<string>>
  let databaseSymbols: Record<Language, string[]>

  const getSymbols = (language: Language) =>
    new Set([
      'ˈ',
      'ˌ',
      '.',
      ...getAlphabetSymbols(IPA, language).map((symbol) => symbol.name),
    ])

  beforeAll(async () => {
    keys = {
      [Language.UK]: getSymbols(Language.UK),
      [Language.US]: getSymbols(Language.US),
    }

    try {
      const pronunciations = await prisma.pronunciation.findMany({
        distinct: ['symbols'],
        select: { symbols: true, language: true },
      })

      const getDatabaseSymbols = (language: Language) =>
        pronunciations
          .filter((pronunciation) => pronunciation.language === language)
          .map((pronunciation) => pronunciation.symbols)

      databaseSymbols = {
        [Language.UK]: getDatabaseSymbols(Language.UK),
        [Language.US]: getDatabaseSymbols(Language.US),
      }
    } catch (e) {
      console.error(e)
      process.exit(1)
    } finally {
      await prisma.$disconnect()
    }
  })

  test('each pronunciation symbol in database has its own input key', () => {
    const validateSymbols = (symbolsArray: string[], language: Language) => {
      symbolsArray.forEach((symbol) => {
        expect(
          keys[language].has(symbol),
          `Symbol "${symbol}" in "${symbolsArray.join(
            ''
          )}" does not exist in the available ${language} keys: ${Array.from(
            keys[language]
          )}`
        ).toBeTruthy()
      })
    }

    ;[Language.UK, Language.US].forEach((language) => {
      databaseSymbols[language].forEach((symbols) => {
        const symbolsArray = symbolsToArray(symbols)
        validateSymbols(symbolsArray, language)
      })
    })
  })
})
