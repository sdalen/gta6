import { useState } from 'react'
import { collectibles, itemId } from '../data/collectibles'
import { href } from '../hooks/useRoute'
import { Icon } from '../components/Icon'
import { Callout, Checkbox, PageHeader, ProgressBar, SearchInput, SectionLabel } from '../components/ui'
import { NotFound } from './NotFound'

interface Props {
  id: string
  done: Set<string>
  onToggle: (id: string) => void
}

export function CollectibleCategoryPage({ id, done, onToggle }: Props) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<'alle' | 'igjen' | 'funnet'>('alle')
  const cat = collectibles.find((c) => c.id === id)
  if (!cat) return <NotFound />

  const q = query.trim().toLowerCase()
  const items = cat.items
    .map((item, i) => ({ item, idx: i, key: itemId(cat.id, i) }))
    .filter(({ item, key }) => {
      if (filter === 'igjen' && done.has(key)) return false
      if (filter === 'funnet' && !done.has(key)) return false
      return !q || item.name.toLowerCase().includes(q) || item.where.toLowerCase().includes(q)
    })
  const found = cat.items.filter((_, i) => done.has(itemId(cat.id, i))).length

  return (
    <div>
      <PageHeader back={cat.kind === 'ran' ? { href: href('ran'), label: 'Ran' } : { href: href('samle'), label: 'Samleobjekter' }} eyebrow={cat.total || undefined} title={cat.name}>
        {cat.about}
      </PageHeader>

      <div className="mb-10 space-y-6">
        {cat.reward && (
          <Callout tone="accent" title="Belønning.">
            {cat.reward}
          </Callout>
        )}
        {cat.tips && (
          <ul className="space-y-2 text-sm leading-relaxed text-muted">
            {cat.tips.map((t) => (
              <li key={t} className="flex gap-3">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-faint" />
                {t}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mb-4 flex items-end justify-between gap-4">
        <SectionLabel>Lokasjoner</SectionLabel>
        <span className="mb-3 text-xs tabular-nums text-muted">
          {found} av {cat.items.length}
        </span>
      </div>
      <ProgressBar value={found} total={cat.items.length} className="mb-5" />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchInput value={query} onChange={setQuery} placeholder="Søk etter navn eller sted" />
        <div role="radiogroup" aria-label="Vis" className="flex shrink-0 rounded-lg bg-surface p-1 text-sm ring-1 ring-line">
          {(
            [
              ['alle', `Alle ${cat.items.length}`],
              ['igjen', `Ikke funnet ${cat.items.length - found}`],
              ['funnet', `Funnet ${found}`],
            ] as const
          ).map(([v, label]) => (
            <button
              key={v}
              type="button"
              role="radio"
              aria-checked={filter === v}
              onClick={() => setFilter(v)}
              className={`flex-1 whitespace-nowrap rounded-md px-3 py-1.5 font-medium transition ${
                filter === v ? (v === 'funnet' ? 'bg-ok text-on-ok' : 'bg-paper text-ink shadow-sm ring-1 ring-line') : 'text-muted hover:text-ink'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <ul className="divide-y divide-line border-y border-line">
        {items.map(({ item, idx, key }) => {
          const isDone = done.has(key)
          return (
            <li key={key} className={`flex items-start gap-4 ${isDone ? 'bg-ok/[0.06]' : ''}`}>
              <button
                type="button"
                onClick={() => onToggle(key)}
                aria-pressed={isDone}
                aria-label={isDone ? `Merk ${item.name} som ikke funnet` : `Merk ${item.name} som funnet`}
                className="group ml-1 mt-3.5 p-1"
              >
                <Checkbox checked={isDone} />
              </button>
              <a href={href('samle', cat.id, String(idx))} className="group flex min-w-0 flex-1 items-center gap-3 py-4">
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-baseline gap-x-2">
                    <span className={`text-[15px] font-medium ${isDone ? 'text-muted line-through decoration-ok/60' : 'text-ink'}`}>{item.name}</span>
                    {isDone && <span className="text-xs font-semibold text-ok">Funnet</span>}
                    {item.before && !isDone && <span className="text-xs font-medium text-warn">Har frist</span>}
                  </span>
                  <span className={`mt-1 flex gap-1.5 text-sm leading-relaxed text-muted ${isDone ? 'opacity-60' : ''}`}>
                    <Icon name="pin" className="mt-0.5 size-4 shrink-0 text-faint" />
                    <span className="line-clamp-2">{item.where}</span>
                  </span>
                </span>
                <Icon name="right" className="size-4 shrink-0 text-faint transition group-hover:translate-x-0.5 group-hover:text-ink-soft" />
              </a>
            </li>
          )
        })}
        {items.length === 0 && <li className="py-10 text-center text-sm text-muted">{filter === 'funnet' && !q ? 'Ingen funnet ennå' : 'Ingen treff'}</li>}
      </ul>
    </div>
  )
}
