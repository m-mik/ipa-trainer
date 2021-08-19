import { Language } from '@prisma/client'

export type PersistedSettings = {
  language: Language
  audioVolume: number
  audioAutoPlay: boolean
}
