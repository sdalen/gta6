import { useState } from 'react'
import { chapters } from '../data/chapters'
import { startIndexes } from '../data/missionIndex'
import { href } from '../hooks/useRoute'
import { ChapterSection } from '../components/ChapterSection'
import { Icon } from '../components/Icon'
import { Checkbox, PageHeader, ProgressBar, SearchInput } from '../components/ui'

interface Props {
  done: Set<string>
  spoilers: boolean
  onToggle: (id: string) => void
  onSetMany: (ids: string[], value: boolean) => void
}

export function MissionsPage({ done, spoilers, onToggle, onSetMany }: Props) {
  const [query, setQuery] = useState('')

  return (
    <div>
      <PageHeader eyebrow="Historien" title="Hovedoppdrag">
        Fem kapitler. Velg et kapittel, eller søk etter et oppdrag.
      </PageHeader>

      <div className="mb-8 flex">
        <SearchInput value={query} onChange={setQuery} placeholder="Søk etter oppdrag, person eller sted" />
      </div>

      {query.trim() ? (
        <div className="space-y-14">
          {chapters.map((c, i) => (
            <ChapterSection
              key={c.id}
              chapter={c}
              query={query}
              done={done}
              spoilers={spoilers}
              onToggle={onToggle}
              startIndex={startIndexes[i]}
            />
          ))}
        </div>
      ) : (
        <>
          <ul className="divide-y divide-line border-y border-line">
            {chapters.map((c) => {
              const completed = c.missions.filter((m) => done.has(m.id)).length
              const allDone = completed === c.missions.length
              return (
                <li key={c.id} className={`flex items-center gap-4 ${allDone ? 'bg-ok/[0.06]' : ''}`}>
                  <button
                    type="button"
                    onClick={() => onSetMany(c.missions.map((m) => m.id), !allDone)}
                    aria-pressed={allDone}
                    aria-label={allDone ? `Fjern avhuking for kapittel ${c.number}` : `Merk hele kapittel ${c.number} som fullført`}
                    title={allDone ? 'Fjern avhuking for hele kapittelet' : 'Merk hele kapittelet som fullført'}
                    className="group ml-1 p-1"
                  >
                    <Checkbox checked={allDone} />
                  </button>
                  <a href={href('kapittel', c.number)} className="group flex min-w-0 flex-1 items-center gap-5 py-5">
                    <span className="w-6 text-2xl font-semibold tabular-nums text-faint transition group-hover:text-accent">
                      {c.number}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-medium text-ink">{c.title}</span>
                      <span className="mt-1.5 flex items-center gap-3">
                        <ProgressBar value={completed} total={c.missions.length} className="max-w-40 flex-1" />
                        <span className="text-xs tabular-nums text-muted">
                          {completed}/{c.missions.length}
                        </span>
                      </span>
                    </span>
                    <Icon name="right" className="size-4 text-faint transition group-hover:translate-x-0.5 group-hover:text-ink-soft" />
                  </a>
                </li>
              )
            })}
          </ul>
          <a href={href('valgfritt')} className="group mt-8 inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
            <Icon name="star" className="size-4 text-accent" />
            Valgfrie oppdrag og Strangers &amp; Freaks
            <Icon name="right" className="size-4 transition group-hover:translate-x-0.5" />
          </a>
        </>
      )}
    </div>
  )
}
