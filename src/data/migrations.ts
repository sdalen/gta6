/**
 * Avhukinger for samleobjekter er lagret etter plass i listen (samle:<kategori>:<indeks>).
 * Når en liste endres, flyttes gamle nøkler her så fremdriften havner på riktig ting.
 */
export const DATA_VERSION = 2

const VERSION_KEY = 'gta6-gjennomgang-dataversjon'
const STORAGE = {
  done: 'gta6-gjennomgang-fremdrift',
  history: 'gta6-gjennomgang-historikk',
  snapshots: 'gta6-gjennomgang-lagringer',
}

/** Versjon 2: «Brygga til Jason» og «Balkongen (Lucia)» var samme meditasjon og er slått sammen til én. */
function toV2(ids: string[]): string[] {
  const out = new Set<string>()
  for (const id of ids) {
    const m = /^samle:meditasjon:(\d+)$/.exec(id)
    if (!m) out.add(id)
    else {
      const n = Number(m[1])
      out.add(`samle:meditasjon:${n <= 1 ? 0 : n - 1}`)
    }
  }
  return [...out]
}

/** Oppgraderer en liste med nøkler fra en eldre versjon. */
export function migrateIds(ids: string[], from: number): string[] {
  return from < 2 ? toV2(ids) : ids
}

/** Kjøres én gang ved oppstart: oppgraderer fremdrift, angrehistorikk og lagringspunkter i nettleseren. */
export function migrateStorage() {
  try {
    const from = Number(localStorage.getItem(VERSION_KEY) ?? 1)
    if (from >= DATA_VERSION) return
    const rewrite = <T,>(key: string, fn: (v: T) => T) => {
      const raw = localStorage.getItem(key)
      if (raw) localStorage.setItem(key, JSON.stringify(fn(JSON.parse(raw) as T)))
    }
    rewrite<string[]>(STORAGE.done, (ids) => migrateIds(ids, from))
    rewrite<{ past?: string[][]; future?: string[][] }>(STORAGE.history, (h) => ({
      past: (h.past ?? []).map((ids) => migrateIds(ids, from)),
      future: (h.future ?? []).map((ids) => migrateIds(ids, from)),
    }))
    rewrite<{ done: string[] }[]>(STORAGE.snapshots, (list) => list.map((s) => ({ ...s, done: migrateIds(s.done, from) })))
    localStorage.setItem(VERSION_KEY, String(DATA_VERSION))
  } catch {
    /* lagring er valgfritt */
  }
}
