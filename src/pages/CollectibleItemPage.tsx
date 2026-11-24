import { chapters } from '../data/chapters'
import { collectibles, itemId } from '../data/collectibles'
import { getDetail } from '../data/collectibleDetails'
import { href } from '../hooks/useRoute'
import { Icon } from '../components/Icon'
import { MapCrop } from '../components/MapCrop'
import { LandmarkPhoto } from '../components/LandmarkPhoto'
import { getLocation } from '../data/mapLocations'
import { Article, Callout, Checkbox, H2, MoreLinks, PageHeader } from '../components/ui'
import { Sources, Steps } from '../components/article'
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

const confidenceText = {
  høy: 'Bekreftet av flere guider.',
  middels: 'Beskrevet av én guide. Detaljene kan avvike litt.',
  lav: 'Guidene er vage her. Let i området rundt punktet.',
}

export function CollectibleItemPage({ catId, idx, done, onToggle }: Props) {
  const cat = collectibles.find((c) => c.id === catId)
  const item = cat?.items[idx]
  if (!cat || !item) return <NotFound />

  const key = itemId(cat.id, idx)
  const isDone = done.has(key)
  const loc = getLocation(key)
  const detail = getDetail(key)
  const deadline = item.before ? missionName(item.before) : null
  const tooLate = item.before ? done.has(item.before) : false
  const prev = idx > 0 ? idx - 1 : null
  const next = idx < cat.items.length - 1 ? idx + 1 : null

  // Sidekolonnen: de nærmeste tingene i samme kategori (i listeorden, som ofte følger geografien).
  const from = Math.max(0, Math.min(idx - 2, cat.items.length - 6))
  const nearby = cat.items.slice(from, from + 6).map((it, i) => ({
    href: href('samle', cat.id, String(from + i)),
    kicker: `${from + i + 1} av ${cat.items.length}${done.has(itemId(cat.id, from + i)) ? ' · funnet' : ''}`,
    label: it.name,
    active: from + i === idx,
  }))

  return (
    <div>
      <PageHeader back={{ href: href('samle', cat.id), label: cat.name }} eyebrow={`${cat.name} · ${idx + 1} av ${cat.items.length}`} title={item.name}>
        {item.where}
      </PageHeader>

      <Article aside={<MoreLinks title={`Flere ${cat.name.toLowerCase()}`} links={nearby} />}>
        <div className="space-y-12">
          {deadline && (
            <Callout tone="warn" title={tooLate ? 'For sent:' : 'Frist:'}>
              {tooLate
                ? `Du har startet ${deadline.name}, så denne kan være borte.`
                : `Må tas før du starter ${deadline.name} (kapittel ${deadline.chapter}).`}
            </Callout>
          )}

          {(detail?.codeHint || detail?.code) && (
            <section className="rounded-lg bg-surface p-5 ring-1 ring-line">
              {detail.code && (
                <p className="mb-4 flex flex-wrap items-baseline gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Kode</span>
                  <span className="font-mono text-3xl font-semibold tracking-widest text-ink">{detail.code}</span>
                </p>
              )}
              {detail.loot && (
                <div className="mb-4">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-ok">Forventet utbytte</p>
                  <p className="text-[17px] leading-relaxed text-ink">{detail.loot}</p>
                </div>
              )}
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">Slik finner du koden</p>
              <p className="text-[17px] leading-relaxed text-ink">{detail.codeHint ?? 'Ingen guide har forklart det ennå.'}</p>
            </section>
          )}

          <section>
            <H2>Hvor ligger den?</H2>
            <dl className="mb-6 grid gap-x-8 gap-y-3 text-[15px] sm:grid-cols-2">
              {detail?.area && (
                <div>
                  <dt className="text-sm text-muted">Område</dt>
                  <dd className="text-ink">{detail.area}</dd>
                </div>
              )}
              {(detail?.landmark || loc?.place) && (
                <div>
                  <dt className="text-sm text-muted">Nærmeste sted på kartet</dt>
                  <dd className="text-ink">{detail?.landmark || loc?.place}</dd>
                </div>
              )}
            </dl>
            {loc?.photo && <LandmarkPhoto id={loc.photo} name={loc.photoOf ?? loc.place} />}
            {loc ? (
              <MapCrop loc={loc} />
            ) : (
              <p className="rounded-lg border border-dashed border-line px-4 py-6 text-center text-sm text-muted">
                Fant ikke stedet i kartdataene ennå.
              </p>
            )}
          </section>

          {detail?.route && detail.route.length > 0 && (
            <section>
              <H2>Slik finner du den</H2>
              <Steps items={detail.route} />
              {detail.spot && (
                <div className="mt-8 rounded-lg bg-surface p-5">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">Akkurat her</p>
                  <p className="text-[17px] leading-relaxed text-ink">{detail.spot}</p>
                </div>
              )}
              {detail.access && (
                <div className="mt-6">
                  <Callout tone="warn" title="Merk:">
                    {detail.access}
                  </Callout>
                </div>
              )}
              {detail.confidence && <p className="mt-4 text-sm text-faint">{confidenceText[detail.confidence]}</p>}
            </section>
          )}

          <section>
            <H2>{detail?.route ? 'Generelt for kategorien' : 'Slik gjør du'}</H2>
            <ol className="space-y-3">
              {cat.howTo.map((s, i) => (
                <li key={s} className="flex gap-4 text-[17px] leading-relaxed text-ink-soft">
                  <span className="w-4 shrink-0 text-right font-serif font-semibold tabular-nums text-accent">{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
            {cat.reward && (
              <div className="mt-8">
                <Callout tone="accent" title="Belønning.">
                  {cat.reward}
                </Callout>
              </div>
            )}
          </section>

          <Sources urls={detail?.sources} />

          <button
            type="button"
            onClick={() => onToggle(key)}
            aria-pressed={isDone}
            className={`group flex w-full items-center justify-center gap-3 rounded-sm py-3.5 text-[15px] font-semibold transition ${
              isDone ? 'bg-ok/10 text-ok ring-1 ring-ok/40' : 'bg-accent text-on-accent hover:bg-accent-dark'
            }`}
          >
            {isDone ? <Checkbox checked /> : <Icon name="check" className="size-5" />}
            {isDone ? 'Funnet. Trykk for å angre' : 'Merk som funnet'}
          </button>

          <nav className="grid grid-cols-2 gap-4 border-t border-line pt-6 text-sm">
            {prev !== null ? (
              <a href={href('samle', cat.id, String(prev))} className="group text-muted">
                <span className="flex items-center gap-1 text-xs uppercase tracking-[0.18em] text-faint">
                  <Icon name="left" className="size-3.5" /> Forrige
                </span>
                <span className="mt-1 block font-serif text-lg text-ink group-hover:text-accent">{cat.items[prev].name}</span>
              </a>
            ) : (
              <span />
            )}
            {next !== null && (
              <a href={href('samle', cat.id, String(next))} className="group text-right text-muted">
                <span className="flex items-center justify-end gap-1 text-xs uppercase tracking-[0.18em] text-faint">
                  Neste <Icon name="right" className="size-3.5" />
                </span>
                <span className="mt-1 block font-serif text-lg text-ink group-hover:text-accent">{cat.items[next].name}</span>
              </a>
            )}
          </nav>
        </div>
      </Article>
    </div>
  )
}
