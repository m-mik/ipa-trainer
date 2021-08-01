const IPA: Alphabet = {
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

export type Lang = 'us' | 'uk'

export interface Character {
  name: string
  example: string
  lang?: Lang
}

export interface Vowels {
  long: Character[]
  short: Character[]
}

export interface Consonants {
  voiced: Character[]
  voiceless: Character[]
}

export interface Other extends Array<Character> {}

export interface Diphthongs extends Array<Character> {}

export interface Alphabet {
  vowels: Vowels
  consonants: Consonants
  diphthongs: Diphthongs
  other: Other
}

export default IPA
