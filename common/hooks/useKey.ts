import { useCallback, useEffect } from 'react'

function useKey(targetKey: string, handler: (e: KeyboardEvent) => void) {
  const keyDownHandler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === targetKey) {
        handler(e)
      }
    },
    [handler, targetKey]
  )

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler)
    return () => window.removeEventListener('keydown', keyDownHandler)
  }, [keyDownHandler])
}

export default useKey
