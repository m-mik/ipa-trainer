import { useEffect } from 'react'
import { Language } from '@prisma/client'
import useLocalStorage from 'react-use/lib/useLocalStorage'
import { ActionType } from '../store/lessonUiActions'
import useLessonUi from './useLessonUi'
import { PersistedSettings } from '../types'

function useLoadSettings() {
  const {
    dispatch,
    state: { isInitialized },
  } = useLessonUi()
  const [
    settings = {
      language: Language.US,
      audioVolume: 0.5,
      audioAutoPlay: true,
    },
  ] = useLocalStorage<PersistedSettings>('ipa-settings')

  useEffect(() => {
    if (isInitialized) return
    const { language, audioVolume, audioAutoPlay } = settings
    dispatch({ type: ActionType.SetLanguage, language })
    dispatch({
      type: ActionType.SetAudioVolume,
      audioVolume,
    })
    dispatch({
      type: ActionType.SetAudioAutoPlay,
      audioAutoPlay,
    })
    dispatch({ type: ActionType.Initialize })
  }, [dispatch, settings, isInitialized])
}

export default useLoadSettings
