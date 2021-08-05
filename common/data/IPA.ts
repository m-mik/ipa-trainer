import { Language } from '@prisma/client'

const IPA: Alphabet = {
  vowels: {
    long: [
      { id: 1, name: 'iː', example: 'sh[ee]p' },
      { id: 2, name: 'ɑː', example: 'f[a]rm' },
      { id: 3, name: 'uː', example: 'c[oo]' },
      { id: 4, name: 'ɔː', example: 'h[o]rse' },
      { id: 5, name: 'ɜː', example: 'b[i]rd' },
    ],
    short: [
      { id: 6, name: 'ɪ', example: 'sh[i]p' },
      { id: 7, name: 'æ', example: 'h[a]t' },
      { id: 8, name: 'ʊ', example: 'f[oo]t' },
      { id: 9, name: 'ɒ', example: 's[o]ck', language: Language.UK },
      { id: 10, name: 'ʌ', example: 'c[u]p' },
      { id: 11, name: 'e', example: 'h[ea]d' },
      { id: 12, name: 'ə', example: '[a]bove' },
      { id: 13, name: 'ɚ', example: 'moth[er]', language: Language.US },
      { id: 14, name: 'ɝ', example: 'w[or]m', language: Language.US },
    ],
  },
  consonants: {
    voiced: [
      { id: 15, name: 'b', example: '[b]ook' },
      { id: 16, name: 'd', example: '[d]ay' },
      { id: 17, name: 'ɡ', example: '[g]ive' },
      { id: 18, name: 'v', example: '[v]ery' },
      { id: 19, name: 'ð', example: '[th]e' },
      { id: 20, name: 'z', example: '[z]oo' },
      { id: 21, name: 'ʒ', example: 'vi[s]ion' },
      { id: 22, name: 'dʒ', example: '[j]ump' },
      { id: 23, name: 'l', example: '[l]ook' },
      { id: 24, name: 'r', example: '[r]un' },
      { id: 25, name: 'j', example: '[y]es' },
      { id: 26, name: 'w', example: '[w]e' },
      { id: 27, name: 'm', example: '[m]oon' },
      { id: 28, name: 'n', example: '[n]ame' },
      { id: 29, name: 'ŋ', example: 'si[n]g' },
    ],
    voiceless: [
      { id: 30, name: 'p', example: '[p]en' },
      { id: 31, name: 't', example: '[t]own' },
      { id: 32, name: 'k', example: '[c]at' },
      { id: 33, name: 'f', example: '[f]ish' },
      { id: 34, name: 'θ', example: '[th]ink' },
      { id: 35, name: 's', example: '[s]ay' },
      { id: 36, name: 'ʃ', example: '[sh]e' },
      { id: 37, name: 'tʃ', example: '[ch]eese' },
    ],
  },
  diphthongs: [
    { id: 38, name: 'eɪ', example: 'd[ay]' },
    { id: 39, name: 'aɪ', example: '[eye]' },
    { id: 40, name: 'ɔɪ', example: 'b[oy]' },
    { id: 41, name: 'aʊ', example: 'm[ou]th' },
    { id: 42, name: 'əʊ', example: 'n[o]se', language: Language.UK },
    { id: 43, name: 'oʊ', example: 'n[o]se', language: Language.US },
    { id: 44, name: 'ɪə', example: '[ea]r', language: Language.UK },
    { id: 45, name: 'eə', example: 'h[air]', language: Language.UK },
    { id: 46, name: 'ʊə', example: 'p[ure]', language: Language.UK },
  ],
  other: [
    { id: 47, name: 'h', example: '[h]and' },
    { id: 48, name: 'ɒ', example: 'croiss[ant]', language: Language.UK },
    { id: 49, name: 'i', example: 'happ[y]' },
    { id: 50, name: 't̬', example: 'bu[tt]er', language: Language.US },
    { id: 51, name: 'u', example: 'infl[u]enza' },
    { id: 52, name: 'l̩', example: 'litt[le]' },
  ],
}

export interface Symbol {
  id: number
  name: string
  example?: string
  language?: Language
}

export interface Alphabet {
  vowels: {
    long: Symbol[]
    short: Symbol[]
  }
  consonants: {
    voiced: Symbol[]
    voiceless: Symbol[]
  }
  diphthongs: Symbol[]
  other: Symbol[]
}

export default IPA
