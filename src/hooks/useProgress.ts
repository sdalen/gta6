import { useCallback, useEffect, useState } from 'react'

const KEY = 'gta6-gjennomgang-fremdrift'

function load(): Set<string> {
  try {
    const raw = localStorage.getItem(KEY)
    return new Set(raw ? (JSON.parse(raw) as string[]) : [])
  } catch {
    return new Set()
  }
}

export function useProgress() {
  const [done, setDone] = useState<Set<string>>(load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify([...done]))
    } catch {
      /* lagring er valgfritt */
    }
  }, [done])

  const toggle = useCallback((id: string) => {
    setDone((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const reset = useCallback(() => setDone(new Set()), [])

  return { done, toggle, reset }
}
