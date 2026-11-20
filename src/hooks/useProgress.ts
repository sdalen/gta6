import { useCallback, useEffect, useState } from 'react'

const KEY = 'gta6-gjennomgang-fremdrift'
const HISTORY_KEY = 'gta6-gjennomgang-historikk'
const APP = 'gta6-gjennomgang'
/** Hvor mange steg bakover man kan angre. */
const MAX_HISTORY = 100

/** Lager innholdet i en eksportfil. */
export function exportProgress(done: Set<string>): string {
  return JSON.stringify({ app: APP, version: 1, exportedAt: new Date().toISOString(), done: [...done].sort() }, null, 2)
}

/** Leser en eksportfil. Godtar også en ren liste med nøkler. Kaster feil hvis formatet er ukjent. */
export function parseProgress(text: string): string[] {
  const data: unknown = JSON.parse(text)
  const list = Array.isArray(data) ? data : (data as { app?: unknown; done?: unknown })?.done
  if (!Array.isArray(list) || !list.every((x) => typeof x === 'string'))
    throw new Error('Filen inneholder ikke fremdrift fra denne appen.')
  return list
}

interface State {
  done: Set<string>
  /** Tidligere tilstander, eldste først. */
  past: string[][]
  /** Tilstander man har angret bort, nærmeste først. */
  future: string[][]
}

function load(): State {
  const state: State = { done: new Set(), past: [], future: [] }
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) state.done = new Set(JSON.parse(raw) as string[])
    const hist = localStorage.getItem(HISTORY_KEY)
    if (hist) {
      const h = JSON.parse(hist) as { past?: string[][]; future?: string[][] }
      state.past = h.past ?? []
      state.future = h.future ?? []
    }
  } catch {
    /* start med tom historikk */
  }
  return state
}

/** Ny tilstand som et vanlig steg: forrige havner i historikken, og «gjør om» tømmes. */
function commit(prev: State, done: Set<string>): State {
  if (done.size === prev.done.size && [...done].every((id) => prev.done.has(id))) return prev
  return { done, past: [...prev.past, [...prev.done]].slice(-MAX_HISTORY), future: [] }
}

export function useProgress() {
  const [state, setState] = useState<State>(load)

  useEffect(() => {
    // Be nettleseren om ikke å slette dataene ved lite lagringsplass (viktig på iOS).
    navigator.storage?.persist?.().catch(() => {})
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify([...state.done]))
      localStorage.setItem(HISTORY_KEY, JSON.stringify({ past: state.past, future: state.future }))
    } catch {
      /* lagring er valgfritt */
    }
  }, [state])

  const toggle = useCallback((id: string) => {
    setState((prev) => {
      const next = new Set(prev.done)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return commit(prev, next)
    })
  }, [])

  const reset = useCallback(() => setState((prev) => commit(prev, new Set())), [])
  const replace = useCallback((ids: string[]) => setState((prev) => commit(prev, new Set(ids))), [])
  const merge = useCallback((ids: string[]) => setState((prev) => commit(prev, new Set([...prev.done, ...ids]))), [])

  const undo = useCallback(
    () =>
      setState((prev) => {
        if (!prev.past.length) return prev
        const done = prev.past[prev.past.length - 1]
        return { done: new Set(done), past: prev.past.slice(0, -1), future: [[...prev.done], ...prev.future] }
      }),
    [],
  )

  const redo = useCallback(
    () =>
      setState((prev) => {
        if (!prev.future.length) return prev
        const [done, ...future] = prev.future
        return { done: new Set(done), past: [...prev.past, [...prev.done]], future }
      }),
    [],
  )

  return {
    done: state.done,
    toggle,
    reset,
    replace,
    merge,
    undo,
    redo,
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0,
  }
}
