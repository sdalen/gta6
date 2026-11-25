import { useEffect } from 'react'
import { chapters } from '../data/chapters'
import { optionalMissions } from '../data/extras'
import { startIndexes } from '../data/missionIndex'
import { href } from '../hooks/useRoute'
import { ChapterSection } from '../components/ChapterSection'
import { Icon } from '../components/Icon'
import { Checkbox } from '../components/ui'
import { NotFound } from './NotFound'

interface Props {
  number: string
  missionId?: string
  done: Set<string>
  spoilers: boolean
  onToggle: (id: string) => void
  onSetMany: (ids: string[], value: boolean) => void
}

export function ChapterPage({ number, missionId, done, spoilers, onToggle, onSetMany }: Props) {
  const idx = chapters.findIndex((c) => c.number === number)

  useEffect(() => {
    if (missionId) document.getElementById(missionId)?.scrollIntoView({ block: 'center' })
  }, [missionId])

  if (idx < 0) return <NotFound />
  const prev = chapters[idx - 1]
  const next = chapters[idx + 1]
  const ids = chapters[idx].missions.map((m) => m.id)
  const allDone = ids.every((id) => done.has(id))
  const earlier = chapters.slice(0, idx).flatMap((c) => c.missions.map((m) => m.id))
  const earlierOpen = earlier.filter((id) => !done.has(id)).length
  const side = optionalMissions.filter((o) => o.chapter === number)
  const sideCount = side.length
  const sideDone = side.filter((o) => done.has(`valgfritt:${o.name}`)).length

  return (
    <div>
      <ChapterSection
        chapter={chapters[idx]}
        query=""
        done={done}
        spoilers={spoilers}
        onToggle={onToggle}
        startIndex={startIndexes[idx]}
        back={{ href: href('oppdrag'), label: 'Alle kapitler' }}
        openMissionId={missionId}
        actions={
          sideCount > 0 && (
            <a
              href={href('valgfritt', 'kapittel', number)}
              className="inline-flex items-center gap-2 rounded-sm px-4 py-2.5 text-[15px] font-semibold text-ink ring-1 ring-line transition hover:ring-frame"
            >
              <Icon name="star" className="size-4 text-accent" />
              Sideoppdrag
              <span className="text-sm font-normal tabular-nums text-muted">
                {sideDone} av {sideCount}
              </span>
            </a>
          )
        }
      />
      <div className="mt-10 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => onSetMany(ids, !allDone)}
          aria-pressed={allDone}
          className={`group inline-flex items-center gap-3 rounded-sm px-5 py-3 text-[15px] font-semibold transition ${
            allDone ? 'bg-ok/10 text-ok ring-1 ring-ok/40' : 'bg-accent text-on-accent hover:bg-accent-dark'
          }`}
        >
          <Checkbox checked={allDone} />
          {allDone ? `Kapittel ${number} er fullført. Trykk for å angre` : `Merk hele kapittel ${number} som fullført`}
        </button>
        {!allDone && earlierOpen > 0 && (
          <button
            type="button"
            onClick={() => onSetMany([...earlier, ...ids], true)}
            className="rounded-sm px-4 py-3 text-[15px] font-medium text-muted ring-1 ring-line transition hover:text-ink hover:ring-frame"
          >
            Merk dette og alle tidligere kapitler
          </button>
        )}
      </div>

      <nav className="mt-12 grid grid-cols-2 gap-4 border-t border-line pt-6 text-sm">
        {prev ? (
          <a href={href('kapittel', prev.number)} className="group text-muted hover:text-ink">
            <span className="flex items-center gap-1 text-xs uppercase tracking-[0.18em] text-faint">
              <Icon name="left" className="size-3.5" /> Kapittel {prev.number}
            </span>
            <span className="mt-1 block font-medium">{prev.title}</span>
          </a>
        ) : (
          <span />
        )}
        {next && (
          <a href={href('kapittel', next.number)} className="group text-right text-muted hover:text-ink">
            <span className="flex items-center justify-end gap-1 text-xs uppercase tracking-[0.18em] text-faint">
              Kapittel {next.number} <Icon name="right" className="size-3.5" />
            </span>
            <span className="mt-1 block font-medium">{next.title}</span>
          </a>
        )}
      </nav>
    </div>
  )
}
