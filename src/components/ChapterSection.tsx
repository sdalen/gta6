import type { Chapter } from '../data/types'
import { missionMatches } from '../data/missionIndex'
import { MissionCard } from './MissionCard'
import { PageHeader, ProgressBar } from './ui'

interface Props {
  chapter: Chapter
  query: string
  done: Set<string>
  spoilers: boolean
  onToggle: (id: string) => void
  startIndex: number
  back?: { href: string; label: string }
}

export function ChapterSection({ chapter, query, done, spoilers, onToggle, startIndex, back }: Props) {
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
          </PageHeader>
          <div className="mb-6 flex items-center gap-4">
            <ProgressBar value={completed} total={total} className="flex-1" />
            <span className="text-xs tabular-nums text-muted">
              {completed} av {total}
            </span>
          </div>
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
          />
        ))}
      </ol>
    </section>
  )
}
