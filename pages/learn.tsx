import {
  Box,
  Container,
  Spinner,
  useOutsideClick,
  VStack,
} from '@chakra-ui/react'
import { NextLayoutPage } from 'next'
import React from 'react'
import dynamic from 'next/dynamic'
import useLesson from '@/modules/lesson/hooks/useLesson'
import useLessonContext from '@/modules/lesson/hooks/useLesssonContext'
import { ActionType } from '@/modules/lesson/store/lessonActions'
import KeyboardPanel from '@/modules/lesson/components/KeyboardPanel'

const SymbolPanel = dynamic(
  () => import('@/modules/lesson/components/SymbolPanel'),
  {
    ssr: false,
  }
)

const Learn: NextLayoutPage = () => {
  const ref = React.useRef<HTMLDivElement>(null)
  const { state, dispatch } = useLessonContext()

  const { isLoading, data } = useLesson()

  useOutsideClick({
    ref,
    handler: (_) =>
      setTimeout(
        () => dispatch({ type: ActionType.ResetActiveSymbolIndex }),
        0
      ),
  })

  return (
    <Container maxW="container.lg">
      <VStack onContextMenu={(e) => e.preventDefault()}>
        {isLoading && <Spinner />}
        <Box ref={ref}>
          <SymbolPanel />
        </Box>
        <KeyboardPanel />
        {/*<LangControl selectedLang={lang} onLangChange={handleLangChange} />*/}
      </VStack>
    </Container>
  )
}

export default Learn
