import type { Chapter } from '../data/types'
import { MissionCard } from './MissionCard'

interface Props {
  chapter: Chapter
  query: string
  done: Set<string>
  spoilers: boolean
  onToggle: (id: string) => void
  startIndex: number
}

function matches(text: string | undefined, q: string) {
  return !!text && text.toLowerCase().includes(q)
}

export function ChapterSection({ chapter, query, done, spoilers, onToggle, startIndex }: Props) {
  const q = query.trim().toLowerCase()
  const indexed = chapter.missions.map((m, i) => ({ m, n: startIndex + i }))
  const visible = q
    ? indexed.filter(
        ({ m }) =>
          matches(m.name, q) ||
          matches(m.task, q) ||
          matches(m.character, q) ||
          (spoilers && (matches(m.summary, q) || m.steps?.some((s) => matches(s, q)))) ||
          matches(m.tip, q),
      )
    : indexed

  if (q && visible.length === 0) return null

  const completed = chapter.missions.filter((m) => done.has(m.id)).length
  const total = chapter.missions.length
  const pct = Math.round((completed / total) * 100)

  return (
    <section id={chapter.id} className="scroll-mt-24">
      <header className="mb-4 border-b border-white/10 pb-4">
        <p className="font-mono text-xs uppercase tracking-widest text-sunset-400">
          Kapittel {chapter.number}
        </p>
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 className="font-display text-4xl tracking-wide sm:text-5xl">{chapter.title}</h2>
          <span className="text-sm text-zinc-400">
            {completed}/{total} fullført
          </span>
        </div>
        <p className="text-sm italic text-zinc-500">«{chapter.titleNo}»</p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-vice-500 to-sunset-400 transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        {spoilers && <p className="mt-3 max-w-3xl text-sm text-zinc-400">{chapter.intro}</p>}
      </header>

      <div className="space-y-3">
        {visible.map(({ m, n }) => (
          <MissionCard
            key={m.id}
            mission={m}
            index={n}
            done={done.has(m.id)}
            spoilers={spoilers}
            onToggle={() => onToggle(m.id)}
          />
        ))}
      </div>
    </section>
  )
}
