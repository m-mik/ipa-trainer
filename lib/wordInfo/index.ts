import { WordInfo } from '@prisma/client'

export const hasIpa = ({ usIpa, ukIpa }: Pick<WordInfo, 'usIpa' | 'ukIpa'>) =>
  ukIpa !== '' || usIpa !== ''
