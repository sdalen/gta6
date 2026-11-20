import { chapters } from '../data/chapters'
import { collectibles, itemId } from '../data/collectibles'
import { href } from '../hooks/useRoute'
import { Icon } from '../components/Icon'
import { MapCrop } from '../components/MapCrop'
import { getLocation } from '../data/mapLocations'
import { Callout, Checkbox, PageHeader, SectionLabel } from '../components/ui'
import { NotFound } from './NotFound'

interface Props {
  catId: string
  idx: number
  done: Set<string>
  onToggle: (id: string) => void
}

const missionName = (id: string) => {
  for (const c of chapters) {
    const m = c.missions.find((m) => m.id === id)
    if (m) return { name: m.name, chapter: c.number }
  }
  return null
}

export function CollectibleItemPage({ catId, idx, done, onToggle }: Props) {
  const cat = collectibles.find((c) => c.id === catId)
  const item = cat?.items[idx]
  if (!cat || !item) return <NotFound />

  const key = itemId(cat.id, idx)
  const isDone = done.has(key)
  const loc = getLocation(key)
  const deadline = item.before ? missionName(item.before) : null
  const tooLate = item.before ? done.has(item.before) : false
  const prev = idx > 0 ? idx - 1 : null
  const next = idx < cat.items.length - 1 ? idx + 1 : null

  return (
    <div>
      <PageHeader back={{ href: href('samle', cat.id), label: cat.name }} eyebrow={`${cat.name} · ${idx + 1} av ${cat.items.length}`} title={item.name} />

      <div className="space-y-10">
        {deadline && (
          <Callout tone="warn" title={tooLate ? 'For sent:' : 'Frist:'}>
            {tooLate
              ? `Du har startet ${deadline.name}, så denne kan være borte.`
              : `Må tas før du starter ${deadline.name} (kapittel ${deadline.chapter}).`}
          </Callout>
        )}

        <section>
          <SectionLabel>Hvor</SectionLabel>
          <p className="mb-4 flex gap-2 text-[15px] leading-relaxed text-ink-soft">
            <Icon name="pin" className="mt-1 size-4 shrink-0 text-accent" />
            {item.where}
          </p>
          {loc ? (
            <MapCrop loc={loc} />
          ) : (
            <p className="rounded-xl border border-dashed border-zinc-800 px-4 py-6 text-center text-sm text-muted">
              Fant ikke stedet i kartdataene ennå.
            </p>
          )}
        </section>

        <section>
          <SectionLabel>Slik gjør du</SectionLabel>
          <ol className="space-y-2.5">
            {cat.howTo.map((s, i) => (
              <li key={s} className="flex gap-4 text-[15px] leading-relaxed text-ink-soft">
                <span className="w-4 shrink-0 text-right font-medium tabular-nums text-accent">{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
          {cat.reward && (
            <div className="mt-6">
              <Callout tone="accent" title="Belønning.">
                {cat.reward}
              </Callout>
            </div>
          )}
        </section>

        <button
          type="button"
          onClick={() => onToggle(key)}
          aria-pressed={isDone}
          className={`group flex w-full items-center justify-center gap-3 rounded-xl py-3.5 text-[15px] font-medium transition ${
            isDone ? 'bg-surface text-ink-soft ring-1 ring-zinc-800' : 'bg-accent text-zinc-950 hover:brightness-110'
          }`}
        >
          {isDone ? <Checkbox checked /> : <Icon name="check" className="size-5" />}
          {isDone ? 'Funnet. Trykk for å angre' : 'Merk som funnet'}
        </button>

        <nav className="grid grid-cols-2 gap-4 border-t border-line pt-6 text-sm">
          {prev !== null ? (
            <a href={href('samle', cat.id, String(prev))} className="text-muted hover:text-ink">
              <span className="flex items-center gap-1 text-xs uppercase tracking-[0.18em] text-faint">
                <Icon name="left" className="size-3.5" /> Forrige
              </span>
              <span className="mt-1 block font-medium">{cat.items[prev].name}</span>
            </a>
          ) : (
            <span />
          )}
          {next !== null && (
            <a href={href('samle', cat.id, String(next))} className="text-right text-muted hover:text-ink">
              <span className="flex items-center justify-end gap-1 text-xs uppercase tracking-[0.18em] text-faint">
                Neste <Icon name="right" className="size-3.5" />
              </span>
              <span className="mt-1 block font-medium">{cat.items[next].name}</span>
            </a>
          )}
        </nav>
      </div>
    </div>
  )
}
