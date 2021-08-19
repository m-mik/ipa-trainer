import { useEffect } from 'react'
import useLocalStorage from 'react-use/lib/useLocalStorage'
import useLessonUi from './useLessonUi'
import { PersistedSettings } from '../types/PersistedSettings'

function usePersistSettings() {
  const {
    state: { language, audioVolume, audioAutoPlay, isInitialized },
  } = useLessonUi()
  const [, setSettings] = useLocalStorage<PersistedSettings>('ipa-settings')

  useEffect(() => {
    if (!isInitialized) return
    setSettings({
      language,
      audioVolume,
      audioAutoPlay,
    } as PersistedSettings)
  }, [language, audioVolume, audioAutoPlay, setSettings, isInitialized])
}

export default usePersistSettings
