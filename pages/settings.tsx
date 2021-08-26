import { NextLayoutPage } from 'next'
import {
  Box,
  Container,
  Heading,
  HStack,
  VStack,
  Checkbox,
} from '@chakra-ui/react'
import { Language } from '@prisma/client'
import dynamic from 'next/dynamic'
import LanguageControl from '@/modules/lesson/components/LanguageControl'
import Audio from '@/modules/lesson/components/Audio'
import useLessonUi from '@/modules/lesson/hooks/useLessonUi'
import { ActionType } from '@/modules/lesson/store/lessonUiActions'
import withAuth from '@/hocs/withAuth'
import Breadcrumb from '@/components/Breadcrumb'

const VolumeControl = dynamic(
  () => import('@/modules/lesson/components/VolumeControl'),
  {
    ssr: false,
  }
)

const Settings: NextLayoutPage = () => {
  const {
    state: { audioVolume, audioAutoPlay, language },
    dispatch,
  } = useLessonUi()

  const sampleAudioSrc =
    'https://dictionary.cambridge.org/media/english/uk_pron/u/ukp/ukpro/ukpromi029.mp3'

  const handleLanguageChange = (language: Language) =>
    dispatch({ type: ActionType.SetLanguage, language })

  const handleAudioVolumeChangeEnd = (audioVolume: number) =>
    dispatch({ type: ActionType.SetAudioVolume, audioVolume })

  const handleAudioAutoPlayChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = !!+e.target.value
    dispatch({
      type: ActionType.SetAudioAutoPlay,
      audioAutoPlay: !isChecked,
    })
  }

  return (
    <Container maxW="container.lg">
      <Breadcrumb
        items={{
          Home: '/',
          Settings: '/settings',
        }}
      />
      <Box maxW="60ch" m="0 auto">
        <Heading as="h2">Settings</Heading>
        <VStack spacing="5" mt="5">
          <HStack spacing="3" w="100%" justifyContent="space-between">
            <Box>IPA Language</Box>
            <Box>
              <LanguageControl
                selectedLanguage={language}
                onLanguageChange={handleLanguageChange}
              />
            </Box>
          </HStack>
          <HStack spacing="3" w="100%" justifyContent="space-between">
            <Box>Audio Volume</Box>
            <HStack w="30%">
              <VolumeControl
                volume={audioVolume}
                onChangeEnd={handleAudioVolumeChangeEnd}
              />
              <Audio
                autoPlay={false}
                src={sampleAudioSrc}
                volume={audioVolume}
              />
            </HStack>
            <Checkbox
              value={+audioAutoPlay}
              isChecked={audioAutoPlay}
              onChange={handleAudioAutoPlayChange}
            >
              Auto Play
            </Checkbox>
          </HStack>
        </VStack>
      </Box>
    </Container>
  )
}

export default withAuth(Settings)
