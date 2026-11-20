import { useRef, useState } from 'react'
import { exportProgress, parseProgress } from '../hooks/useProgress'
import { useSnapshots } from '../hooks/useSnapshots'
import { Icon } from './Icon'

interface Props {
  done: Set<string>
  onReplace: (ids: string[]) => void
  onMerge: (ids: string[]) => void
  onReset: () => void
}

/** Lagring: fremdriften ligger i nettleseren, og kan lastes ned og importeres på en annen enhet. */
export function DataSection({ done, onReplace, onMerge, onReset }: Props) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [pending, setPending] = useState<{ ids: string[]; file: string } | null>(null)
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null)
  const { snapshots, save, remove } = useSnapshots()
  const [name, setName] = useState('')
  /** Tar vare på det som er her nå før noe overskriver det, så det kan hentes opp igjen. */
  const backup = (reason: string) => {
    if (done.size) save(done, `Før ${reason}`, true)
  }

  const saveNow = () => {
    save(done, name.trim() || 'Lagring')
    setName('')
    setMessage({ ok: true, text: `Lagret ${done.size} avhukinger i nettleseren.` })
  }

  const restore = (id: string) => {
    const snap = snapshots.find((s) => s.id === id)
    if (!snap) return
    if (!confirm(`Hente opp «${snap.name}» (${snap.done.length} avhukinger)? Det du har nå lagres automatisk først.`)) return
    backup(`henting av «${snap.name}»`)
    onReplace(snap.done)
    setMessage({ ok: true, text: `Hentet opp «${snap.name}».` })
  }

  const download = () => {
    const blob = new Blob([exportProgress(done)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `gta6-fremdrift-${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(a)
    a.click()
    a.remove()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
    setMessage({ ok: true, text: `Lastet ned ${done.size} avhukinger.` })
  }

  const pick = async (file: File | undefined) => {
    if (!file) return
    try {
      const ids = parseProgress(await file.text())
      setPending({ ids, file: file.name })
      setMessage(null)
    } catch (e) {
      setPending(null)
      setMessage({ ok: false, text: e instanceof SyntaxError ? 'Filen er ikke gyldig JSON.' : (e as Error).message })
    } finally {
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const apply = (mode: 'merge' | 'replace') => {
    if (!pending) return
    backup('import')
    if (mode === 'merge') {
      const added = pending.ids.filter((id) => !done.has(id)).length
      onMerge(pending.ids)
      setMessage({ ok: true, text: `Importert. ${added} nye avhukinger lagt til.` })
    } else {
      onReplace(pending.ids)
      setMessage({ ok: true, text: `Importert. Fremdriften er nå ${pending.ids.length} avhukinger fra filen.` })
    }
    setPending(null)
  }

  const btn =
    'inline-flex items-center gap-2 rounded-lg bg-surface px-3.5 py-2 text-sm font-medium text-ink ring-1 ring-zinc-800 transition hover:ring-frame'

  return (
    <section>
            <p className="mb-4 text-sm text-muted">
        Fremdriften ({done.size} avhukinger) lagres hele tiden i nettleseren. Lag et lagringspunkt hvis du vil kunne gå
        tilbake hit senere, for eksempel hvis du huker av noe feil.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          saveNow()
        }}
        className="flex gap-2"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Navn (valgfritt), f.eks. «Før kapittel 3»"
          maxLength={60}
          className="min-w-0 flex-1 rounded-lg border border-zinc-800 bg-surface/60 px-3 py-2 text-sm text-ink placeholder:text-faint focus:border-frame focus:outline-none"
        />
        <button type="submit" className={btn}>
          <Icon name="check" className="size-4 text-accent" />
          Lagre nå
        </button>
      </form>

      {snapshots.length > 0 && (
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {snapshots.map((snap) => (
            <li key={snap.id} className="flex items-center gap-3 py-2.5">
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm text-ink">
                  {snap.name}
                  {snap.auto && <span className="ml-2 text-xs text-faint">automatisk</span>}
                </span>
                <span className="text-xs text-muted">
                  {formatDate(snap.savedAt)} · {snap.done.length} avhukinger
                </span>
              </span>
              <button type="button" onClick={() => restore(snap.id)} className="rounded-md px-2.5 py-1.5 text-sm font-medium text-accent hover:bg-accent-dim">
                Hent opp
              </button>
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Slette lagringen «${snap.name}»?`)) remove(snap.id)
                }}
                aria-label={`Slett ${snap.name}`}
                className="rounded-md px-2 py-1.5 text-sm text-faint hover:text-red-400"
              >
                Slett
              </button>
            </li>
          ))}
        </ul>
      )}

      <h3 className="mb-1 mt-8 text-xs font-medium uppercase tracking-[0.18em] text-muted">Flytt til en annen enhet</h3>
      <p className="mb-4 text-sm text-muted">Last ned en fil og importer den på den andre enheten.</p>

      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={download} className={btn}>
          <Icon name="download" className="size-4 text-accent" />
          Last ned fremdrift
        </button>
        <button type="button" onClick={() => fileRef.current?.click()} className={btn}>
          <Icon name="download" className="size-4 rotate-180 text-accent" />
          Importer fra fil
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={(e) => pick(e.target.files?.[0])}
        />
      </div>

      {pending && (
        <div className="mt-4 rounded-xl bg-surface p-4 ring-1 ring-zinc-800">
          <p className="text-sm text-ink">
            «{pending.file}» har {pending.ids.length} avhukinger. Du har {done.size} her nå.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={() => apply('merge')} className={btn}>
              Slå sammen
            </button>
            <button type="button" onClick={() => apply('replace')} className={`${btn} hover:text-red-400`}>
              Erstatt det som er her
            </button>
            <button type="button" onClick={() => setPending(null)} className="px-3 py-2 text-sm text-muted hover:text-ink">
              Avbryt
            </button>
          </div>
          <p className="mt-2 text-xs text-faint">
            «Slå sammen» beholder alt du har huket av her og legger til det fra filen.
          </p>
        </div>
      )}

      {message && (
        <p role="status" className={`mt-3 text-sm ${message.ok ? 'text-emerald-400' : 'text-red-400'}`}>
          {message.text}
        </p>
      )}

      <button
        type="button"
        onClick={() => {
          if (confirm('Nullstille all fremdrift? Det du har nå lagres automatisk, så du kan hente det opp igjen.')) {
            backup('nullstilling')
            onReset()
            setMessage({ ok: true, text: 'Fremdriften er nullstilt.' })
          }
        }}
        className="mt-6 text-xs text-muted underline-offset-4 hover:text-red-400 hover:underline"
      >
        Nullstill fremdrift
      </button>
    </section>
  )
}

const dateFormat = new Intl.DateTimeFormat('nb-NO', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })

function formatDate(iso: string) {
  try {
    return dateFormat.format(new Date(iso))
  } catch {
    return iso
  }
}
