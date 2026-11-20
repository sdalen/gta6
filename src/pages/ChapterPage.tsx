import { useEffect } from 'react'
import { chapters } from '../data/chapters'
import { startIndexes } from '../data/missionIndex'
import { href } from '../hooks/useRoute'
import { ChapterSection } from '../components/ChapterSection'
import { Icon } from '../components/Icon'
import { NotFound } from './NotFound'

interface Props {
  number: string
  missionId?: string
  done: Set<string>
  spoilers: boolean
  onToggle: (id: string) => void
}

export function ChapterPage({ number, missionId, done, spoilers, onToggle }: Props) {
  const idx = chapters.findIndex((c) => c.number === number)

  useEffect(() => {
    if (missionId) document.getElementById(missionId)?.scrollIntoView({ block: 'center' })
  }, [missionId])

  if (idx < 0) return <NotFound />
  const prev = chapters[idx - 1]
  const next = chapters[idx + 1]

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
      />
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
