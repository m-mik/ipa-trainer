import { Answer, Language } from '@prisma/client'
import IPA, { Alphabet, Symbol } from '@/common/data/IPA'
import { LessonWithPronunciations } from '@/types/LessonWithPronunciations'

export function getAnswerCountByType(questions: Array<{ answer: Answer }>) {
  return questions.reduce(
    (result, question) => {
      let count = result[question.answer] ?? 0
      return { ...result, [question.answer]: ++count }
    },
    { CORRECT: 0, INCORRECT: 0, NONE: 0 }
  )
}

export function removeUnansweredQuestionSymbols(
  lesson: LessonWithPronunciations
) {
  return {
    ...lesson,
    questions: lesson.questions.map((question) => ({
      ...question,
      word: {
        ...question.word,
        pronunciations: question.word.pronunciations.map((pronunciation) => {
          if (question.answer === Answer.NONE) {
            const { symbols, ...rest } = pronunciation
            return rest
          } else return pronunciation
        }),
      },
    })),
  }
}

export function getAlphabetSymbols(alphabet: Alphabet, language?: Language) {
  const isUniversalSymbol = (symbol: Symbol) =>
    typeof symbol.language === 'undefined'
  const { vowels, consonants, diphthongs, other } = alphabet
  const symbols = [
    ...vowels.long,
    ...vowels.short,
    ...consonants.voiced,
    ...consonants.voiceless,
    ...diphthongs,
    ...other,
  ] as Symbol[]
  return language
    ? symbols.filter(
        (symbol) => isUniversalSymbol(symbol) || symbol.language === language
      )
    : symbols
}

export function symbolsToArray(symbols: string) {
  const twoCharacterIpaSymbols = new Set(
    getAlphabetSymbols(IPA)
      .map((symbol) => symbol.name)
      .filter((ipaSymbol) => ipaSymbol.length === 2)
  )
  const result = []
  const symbolArray = symbols.split('')
  for (let i = 0; i < symbolArray.length; i++) {
    const twoCharacters = symbolArray[i] + symbolArray[i + 1]
    if (twoCharacterIpaSymbols.has(twoCharacters)) {
      result.push(twoCharacters)
      i++
    } else {
      result.push(symbolArray[i])
    }
  }
  return result
}
