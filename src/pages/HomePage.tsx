import { useState } from 'react'
import { chapters } from '../data/chapters'
import { searchAll, searchGroups } from '../data/search'
import { collectibles, itemId } from '../data/collectibles'
import { href } from '../hooks/useRoute'
import { Icon, type IconName } from '../components/Icon'
import { InstallButton } from '../components/InstallButton'
import { Checkbox, ProgressBar, SearchInput } from '../components/ui'
import { nextDeadline } from '../data/reminders'

const OPEN_KEY = 'gta6-gjennomgang-frist-apen'

const totalMissions = chapters.reduce((n, c) => n + c.missions.length, 0)
const totalItems = collectibles.reduce((n, c) => n + c.items.length, 0)

interface Props {
  done: Set<string>
  spoilers: boolean
  onToggle: (id: string) => void
}

export function HomePage({ done, spoilers, onToggle }: Props) {
  const [query, setQuery] = useState('')
  const q = query.trim()
  const completed = chapters.reduce((n, c) => n + c.missions.filter((m) => done.has(m.id)).length, 0)
  const collected = collectibles.reduce((n, c) => n + c.items.filter((_, i) => done.has(itemId(c.id, i))).length, 0)
  const nextChapter = chapters.find((c) => c.missions.some((m) => !done.has(m.id)))
  const nextMission = nextChapter?.missions.find((m) => !done.has(m.id))
  const pct = Math.round((completed / totalMissions) * 100)
  const deadline = nextDeadline(done)
  /** Påminnelse når fristen nærmer seg og noe fortsatt gjenstår. */
  const soon = !!deadline && deadline.open.length > 0 && deadline.missionsBefore < 5
  const [deadlineOpen, setDeadlineOpen] = useState(() => {
    try {
      return localStorage.getItem(OPEN_KEY) === '1'
    } catch {
      return false
    }
  })
  const toggleDeadline = () => {
    const next = !deadlineOpen
    setDeadlineOpen(next)
    try {
      localStorage.setItem(OPEN_KEY, next ? '1' : '0')
    } catch {
      /* valgfritt */
    }
  }

  const links: { to: string; icon: IconName; title: string; sub: string }[] = [
    { to: href('oppdrag'), icon: 'book', title: 'Hovedoppdrag', sub: `${completed} av ${totalMissions} fullført` },
    { to: href('samle'), icon: 'compass', title: 'Samleobjekter', sub: `${collected} av ${totalItems} funnet` },
    { to: href('utfordringer'), icon: 'trophy', title: 'Challenges', sub: '80 utfordringer og 13 løp' },
    { to: href('valgfritt'), icon: 'star', title: 'Valgfrie oppdrag', sub: 'Sideoppdrag og Strangers & Freaks' },
    { to: href('penger'), icon: 'coins', title: 'Pengestrategi', sub: 'Hvordan tjene mest, kapittel for kapittel' },
    { to: href('tips'), icon: 'bulb', title: 'Før du begynner', sub: 'Ting du ikke kan gjøre om senere' },
  ]

  return (
    <div>
      <header className="pb-12 pt-6 sm:pt-12">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-accent">Leonida · Vice City</p>
        <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">GTA VI på norsk</h1>
        <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted">
          Gjennomgang av hele historien, samleobjekter og tips. Huk av underveis, så husker appen hvor du er.
        </p>
        <InstallButton />
      </header>

      <div className="mb-12 flex">
        <SearchInput value={query} onChange={setQuery} placeholder="Søk i alt: oppdrag, steder, samleobjekter, challenges …" />
      </div>

      {q ? (
        <SearchResults query={query} done={done} spoilers={spoilers} onToggle={onToggle} />
      ) : (
      <>

      <section className="mb-12">
        <div className="mb-3 flex items-baseline justify-between">
          <span className="text-sm text-muted">Fremdrift i historien</span>
          <span className="text-2xl font-semibold tabular-nums text-ink">{pct} %</span>
        </div>
        <ProgressBar value={completed} total={totalMissions} />
        {nextChapter && nextMission && (
          <a
            href={href('kapittel', nextChapter.number, nextMission.id)}
            className="group mt-6 flex items-center justify-between gap-4 rounded-xl bg-surface p-5 ring-1 ring-zinc-800 transition hover:ring-frame"
          >
            <span>
              <span className="block text-xs uppercase tracking-[0.18em] text-muted">
                Neste · Kapittel {nextChapter.number}
              </span>
              <span className="mt-1 block text-lg font-medium text-ink">{nextMission.name}</span>
            </span>
            <Icon name="right" className="size-5 text-accent transition group-hover:translate-x-0.5" />
          </a>
        )}
      </section>

      {deadline && (
        <section className={`mb-12 rounded-xl border bg-red-400/[0.06] ${soon ? 'border-red-400/60' : 'border-red-400/30'}`}>
          <button
            type="button"
            onClick={toggleDeadline}
            aria-expanded={deadlineOpen}
            className="group flex w-full items-center gap-4 p-4 text-left sm:p-5"
          >
            <Icon name="alert" className="size-5 shrink-0 text-red-400" />
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-medium uppercase tracking-[0.18em] text-red-400">Gjør dette først</span>
              <span className="mt-0.5 block truncate text-[15px] font-semibold text-ink">
                Før {deadline.mission.name}
                <span className="font-normal text-muted"> · Kap. {deadline.chapter}</span>
              </span>
              {soon && (
                <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-red-400/15 px-2.5 py-1 text-xs font-medium text-red-300 ring-1 ring-red-400/30">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-60" />
                    <span className="relative inline-flex size-2 rounded-full bg-red-400" />
                  </span>
                  {deadline.missionsBefore === 0
                    ? `${deadline.mission.name} er neste oppdrag. Gjør resten nå!`
                    : `Snart! Bare ${deadline.missionsBefore} oppdrag igjen før ${deadline.mission.name}.`}
                </span>
              )}
              <span className="mt-2 flex items-center gap-3">
                <ProgressBar value={deadline.total - deadline.open.length} total={deadline.total} className="max-w-32 flex-1" />
                <span className="text-xs tabular-nums text-muted">
                  <span className="text-ink">{deadline.open.length}</span> av {deadline.total} gjenstår ·{' '}
                  <span className="text-ink">{deadline.missionsBefore}</span> oppdrag igjen
                </span>
              </span>
            </span>
            <Icon
              name="right"
              className={`size-5 shrink-0 text-muted transition group-hover:text-ink ${deadlineOpen ? 'rotate-90' : ''}`}
            />
          </button>
          {deadlineOpen && (
          <div className="px-4 pb-4 sm:px-5 sm:pb-5">
          <p className="text-sm text-muted">Når du starter {deadline.mission.name}, kan dette være borte for godt. Huk av etter hvert som du gjør det.</p>
          {kindsOf(deadline.all).map((kind) => (
            <div key={kind} className="mt-5">
              <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                {kind === 'Forberedelse' ? 'Forberedelser' : kind}
              </h3>
              <ul className="mt-2 divide-y divide-line border-y border-line">
                {deadline.all
                  .filter((r) => r.kind === kind)
                  .map((r) => {
                    const checked = done.has(r.doneKey)
                    const body = (
                      <span className="min-w-0 flex-1">
                        <span className={`block text-[15px] font-medium ${checked ? 'text-muted line-through decoration-faint' : 'text-ink'}`}>
                          {r.label}
                        </span>
                        {r.detail && <span className="mt-0.5 block text-sm leading-snug text-muted">{r.detail}</span>}
                      </span>
                    )
                    return (
                      <li key={r.key} className={`flex items-start gap-3 ${checked ? 'opacity-70' : ''}`}>
                        <button
                          type="button"
                          onClick={() => onToggle(r.doneKey)}
                          aria-label={checked ? `Merk ${r.label} som ikke gjort` : `Merk ${r.label} som gjort`}
                          aria-pressed={checked}
                          className="group -m-2 mt-1 p-2"
                        >
                          <Checkbox checked={checked} tone="green" />
                        </button>
                        {r.to ? (
                          <a href={r.to} className="group flex min-w-0 flex-1 items-center gap-3 py-3">
                            {body}
                            <Icon name="right" className="size-4 shrink-0 text-faint transition group-hover:translate-x-0.5 group-hover:text-ink-soft" />
                          </a>
                        ) : (
                          <button type="button" onClick={() => onToggle(r.doneKey)} className="flex min-w-0 flex-1 py-3 text-left">
                            {body}
                          </button>
                        )}
                      </li>
                    )
                  })}
              </ul>
            </div>
          ))}
          </div>
          )}
        </section>
      )}

      <ul className="divide-y divide-line border-y border-line">
        {links.map((l) => (
          <li key={l.to}>
            <a href={l.to} className="group flex items-center gap-4 py-4">
              <Icon name={l.icon} className="size-5 text-muted transition group-hover:text-accent" />
              <span className="flex-1">
                <span className="block text-[15px] font-medium text-ink">{l.title}</span>
                <span className="text-sm text-muted">{l.sub}</span>
              </span>
              <Icon name="right" className="size-4 text-faint transition group-hover:translate-x-0.5 group-hover:text-ink-soft" />
            </a>
          </li>
        ))}
      </ul>
      </>
      )}
    </div>
  )
}

const MAX_PER_GROUP = 25

function SearchResults({ query, done, spoilers, onToggle }: Props & { query: string }) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const hits = searchAll(query, spoilers)
  if (!hits.length) return <p className="text-sm text-muted">Fant ingenting som passer «{query.trim()}».</p>

  return (
    <div className="space-y-10">
      <p className="text-sm text-muted">
        {hits.length} treff
      </p>
      {searchGroups.map((group) => {
        const all = hits.filter((h) => h.group === group)
        if (!all.length) return null
        const shown = expanded.has(group) ? all : all.slice(0, MAX_PER_GROUP)
        return (
          <section key={group}>
            <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-muted">
              {group} <span className="text-faint">· {all.length}</span>
            </h2>
            <ul className="divide-y divide-line border-y border-line">
              {shown.map((h) => {
                const checked = !!h.doneKey && done.has(h.doneKey)
                return (
                  <li key={h.key} className="flex items-center gap-3">
                    {h.doneKey ? (
                      <button
                        type="button"
                        onClick={() => onToggle(h.doneKey!)}
                        aria-label={checked ? `Merk ${h.title} som ikke gjort` : `Merk ${h.title} som gjort`}
                        aria-pressed={checked}
                        className="group -m-2 p-2"
                      >
                        <Checkbox checked={checked} tone="green" />
                      </button>
                    ) : (
                      <span className="w-5 shrink-0" />
                    )}
                    <a href={h.to} className="group flex min-w-0 flex-1 items-center gap-3 py-3">
                      <span className="min-w-0 flex-1">
                        <span className={`block text-[15px] ${checked ? 'text-muted' : 'text-ink'}`}>{h.title}</span>
                        <span className="line-clamp-2 text-xs text-muted">{h.sub}</span>
                      </span>
                      <Icon name="right" className="size-4 shrink-0 text-faint transition group-hover:translate-x-0.5 group-hover:text-ink-soft" />
                    </a>
                  </li>
                )
              })}
            </ul>
            {all.length > shown.length && (
              <button
                type="button"
                onClick={() => setExpanded(new Set(expanded).add(group))}
                className="mt-3 text-sm text-accent hover:underline"
              >
                Vis alle {all.length}
              </button>
            )}
          </section>
        )
      })}
    </div>
  )
}

/** Gruppene i fristlisten, i den rekkefølgen de først dukker opp. */
function kindsOf(items: { kind: string }[]) {
  return [...new Set(items.map((r) => r.kind))]
}
