import { useCallback, useEffect, useState } from 'react'

const KEY = 'gta6-gjennomgang-lagringer'
/** Automatiske lagringer ryddes når det blir flere enn dette. Manuelle beholdes. */
const MAX_AUTO = 10

export interface Snapshot {
  id: string
  name: string
  savedAt: string
  auto: boolean
  done: string[]
}

function load(): Snapshot[] {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Snapshot[]) : []
  } catch {
    return []
  }
}

/** Lagringspunkter i nettleseren, så fremdriften kan hentes opp igjen uten fil. */
export function useSnapshots() {
  const [snapshots, setSnapshots] = useState<Snapshot[]>(load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(snapshots))
    } catch {
      /* lagring er valgfritt */
    }
  }, [snapshots])

  const save = useCallback((done: Set<string>, name: string, auto = false) => {
    const snap: Snapshot = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name,
      savedAt: new Date().toISOString(),
      auto,
      done: [...done],
    }
    setSnapshots((prev) => {
      const next = [snap, ...prev]
      const autos = next.filter((s) => s.auto)
      if (autos.length <= MAX_AUTO) return next
      const drop = new Set(autos.slice(MAX_AUTO).map((s) => s.id))
      return next.filter((s) => !drop.has(s.id))
    })
  }, [])

  const remove = useCallback((id: string) => setSnapshots((prev) => prev.filter((s) => s.id !== id)), [])

  return { snapshots, save, remove }
}
