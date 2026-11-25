import type { ReactNode } from 'react'
import type { Chapter } from '../data/types'
import { missionMatches } from '../data/missionIndex'
import { MissionCard, ReminderList } from './MissionCard'
import { remindersFor, type Reminder } from '../data/reminders'
import { PageHeader, ProgressBar } from './ui'

/** Alt med frist i kapittelet, samlet øverst og gruppert etter oppdraget det må gjøres før. */
function ChapterTodo({ chapter, done, onToggle }: { chapter: Chapter; done: Set<string>; onToggle: (id: string) => void }) {
  const seen = new Set<string>()
  const groups: { mission: string; items: Reminder[] }[] = []
  for (const m of chapter.missions) {
    if (done.has(m.id)) continue
    const items = remindersFor(m.id).filter((r) => !seen.has(r.doneKey))
    items.forEach((r) => seen.add(r.doneKey))
    if (items.length) groups.push({ mission: m.name, items })
  }
  const all = groups.flatMap((g) => g.items)
  if (!all.length) return null
  const open = all.filter((r) => !done.has(r.doneKey)).length

  return (
    <details open={open > 0} className="group mb-8 rounded-lg bg-surface p-5 ring-1 ring-line">
      <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-warn">Gjør før kapittel {chapter.number} er ferdig</span>
        <span className={`text-sm tabular-nums ${open ? 'text-muted' : 'font-medium text-ok'}`}>
          {open ? `${open} igjen av ${all.length}` : 'Alt er gjort'}
        </span>
      </summary>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-ink-soft">
        {groups.map((g) => (
          <div key={g.mission}>
            <p className="font-medium text-ink">Før {g.mission}</p>
            <ReminderList items={g.items} progress={done} onToggle={onToggle} />
          </div>
        ))}
      </div>
    </details>
  )
}

interface Props {
  chapter: Chapter
  query: string
  done: Set<string>
  spoilers: boolean
  onToggle: (id: string) => void
  startIndex: number
  back?: { href: string; label: string }
  /** Knapper som vises rett under kapittelteksten. */
  actions?: ReactNode
}

export function ChapterSection({ chapter, query, done, spoilers, onToggle, startIndex, back, actions }: Props) {
  const q = query.trim().toLowerCase()
  const indexed = chapter.missions.map((m, i) => ({ m, n: startIndex + i }))
  const visible = q
    ? indexed.filter(({ m }) => missionMatches(m, q, spoilers))
    : indexed

  if (q && visible.length === 0) return null

  const completed = chapter.missions.filter((m) => done.has(m.id)).length
  const total = chapter.missions.length

  return (
    <section>
      {q ? (
        <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-muted">
          Kapittel {chapter.number} · {chapter.title}
        </h2>
      ) : (
        <>
          <PageHeader back={back} eyebrow={`Kapittel ${chapter.number} · «${chapter.titleNo}»`} title={chapter.title}>
            {spoilers ? chapter.intro : null}
            {actions && <div className={spoilers ? 'mt-5' : ''}>{actions}</div>}
          </PageHeader>
          <div className="mb-6 flex items-center gap-4">
            <ProgressBar value={completed} total={total} className="flex-1" />
            <span className="text-xs tabular-nums text-muted">
              {completed} av {total}
            </span>
          </div>
          <ChapterTodo chapter={chapter} done={done} onToggle={onToggle} />
        </>
      )}

      <ol className="divide-y divide-line border-y border-line">
        {visible.map(({ m, n }) => (
          <MissionCard
            key={m.id}
            mission={m}
            index={n}
            done={done.has(m.id)}
            spoilers={spoilers}
            onToggle={() => onToggle(m.id)}
            progress={done}
            onToggleItem={onToggle}
          />
        ))}
      </ol>
    </section>
  )
}
