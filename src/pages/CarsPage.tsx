import { useState } from 'react'
import { cars, garageRules, garages, rarityText, type Car } from '../data/cars'
import { getLocation } from '../data/mapLocations'
import { href } from '../hooks/useRoute'
import { Icon } from '../components/Icon'
import { MapCrop } from '../components/MapCrop'
import { LandmarkPhoto } from '../components/LandmarkPhoto'
import { Article, Callout, H2, MoreLinks, PageHeader } from '../components/ui'
import { Bullets, Facts, Sources, Steps } from '../components/article'
import { NotFound } from './NotFound'

function CarRow({ c }: { c: Car }) {
  return (
    <li>
      <a href={href('biler', c.id)} className="group flex items-center gap-4 py-5">
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-serif text-xl text-ink transition group-hover:text-accent">{c.name}</span>
            {c.missable && <span className="rounded-full px-2.5 py-0.5 text-xs font-semibold text-warn ring-1 ring-warn/40">Går tapt</span>}
          </span>
          <span className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
            <span>
              {rarityText[c.rarity]} · {c.class}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="pin" className="size-3.5 text-faint" />
              {c.location.place}
            </span>
          </span>
        </span>
        <Icon name="right" className="size-4 shrink-0 text-faint transition group-hover:translate-x-0.5 group-hover:text-accent" />
      </a>
    </li>
  )
}

export function CarsPage() {
  const [showAllRules, setShowAllRules] = useState(false)
  const missable = cars.filter((c) => c.missable)
  const unique = cars.filter((c) => !c.missable && c.rarity === 'unik')
  const rare = cars.filter((c) => !c.missable && c.rarity !== 'unik')
  const rules = showAllRules ? garageRules : garageRules.slice(0, 5)

  return (
    <div>
      <PageHeader eyebrow="Garasjen" title="Eksklusive biler">
        De sjeldneste bilene du kan beholde, hvor de står og når det lønner seg å hente dem. Først: slik får du en bil til å bli
        din for godt.
      </PageHeader>

      <section className="mb-14">
        <H2>Slik beholder du en bil</H2>
        <div className="space-y-6">
          {rules.map((r) => (
            <div key={r.title}>
              <h3 className="text-[17px] font-semibold text-ink">{r.title}</h3>
              <p className="mt-1 text-[17px] leading-relaxed text-ink-soft">{r.body}</p>
            </div>
          ))}
        </div>
        {garageRules.length > 5 && (
          <button type="button" onClick={() => setShowAllRules((s) => !s)} className="mt-5 text-[15px] font-medium text-accent underline underline-offset-4">
            {showAllRules ? 'Vis færre' : `Vis alle ${garageRules.length} reglene`}
          </button>
        )}
      </section>

      {missable.length > 0 && (
        <section className="mb-12">
          <H2>Går tapt: hent disse i tide</H2>
          <ul className="divide-y divide-line border-y border-line">
            {missable.map((c) => (
              <CarRow key={c.id} c={c} />
            ))}
          </ul>
        </section>
      )}

      <section className="mb-12">
        <H2>Unike biler</H2>
        <ul className="divide-y divide-line border-y border-line">
          {unique.map((c) => (
            <CarRow key={c.id} c={c} />
          ))}
        </ul>
      </section>

      {rare.length > 0 && (
        <section className="mb-12">
          <H2>Sjeldne biler (Randys liste m.fl.)</H2>
          <ul className="divide-y divide-line border-y border-line">
            {rare.map((c) => (
              <CarRow key={c.id} c={c} />
            ))}
          </ul>
        </section>
      )}

      <section className="mb-12">
        <H2>Garasjer</H2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[36rem] text-left text-[15px]">
            <thead className="border-b border-line text-xs uppercase tracking-[0.15em] text-muted">
              <tr>
                <th className="py-3 pr-4 font-semibold">Garasje</th>
                <th className="py-3 pr-4 font-semibold">Hvem</th>
                <th className="py-3 pr-4 font-semibold">Plasser</th>
                <th className="py-3 font-semibold">Får du</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {garages.map((g) => (
                <tr key={g.name} className="align-top">
                  <td className="py-3 pr-4">
                    <span className="block text-ink">{g.name}</span>
                    <span className="text-sm text-muted">{g.place}</span>
                  </td>
                  <td className="py-3 pr-4 text-ink-soft">{g.character}</td>
                  <td className="py-3 pr-4 text-ink-soft">{g.capacity}</td>
                  <td className="py-3 text-sm leading-relaxed text-ink-soft">{g.unlock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export function CarPage({ id }: { id: string }) {
  const c = cars.find((x) => x.id === id)
  if (!c) return <NotFound />
  const loc = getLocation(`bil:${c.id}`)

  return (
    <div>
      <PageHeader back={{ href: href('biler'), label: 'Eksklusive biler' }} eyebrow={`${rarityText[c.rarity]} · ${c.class}`} title={c.name}>
        {c.location.detail}
      </PageHeader>

      <Article
        aside={
          <MoreLinks
            title="Flere biler"
            links={cars.map((x) => ({ href: href('biler', x.id), kicker: `${rarityText[x.rarity]} · ${x.class}`, label: x.name, active: x.id === c.id }))}
          />
        }
      >
        <div className="space-y-12">
          {c.missable && (
            <Callout tone="warn" title="Går tapt.">
              {c.deadline ?? 'Hent den før muligheten forsvinner.'}
            </Callout>
          )}

          <Facts
            rows={[
              ['Verdi', c.value],
              ['Dukker opp', c.spawn],
            ]}
          />

          <section>
            <H2>Når bør du hente den?</H2>
            <p className="text-[17px] leading-relaxed text-ink-soft">{c.when}</p>
          </section>

          <section>
            <H2>Hvor står den?</H2>
            <p className="mb-5 flex gap-2 text-[17px] leading-relaxed text-ink-soft">
              <Icon name="pin" className="mt-1.5 size-4 shrink-0 text-accent" />
              <span>
                <span className="font-medium text-ink">{c.location.place}</span>, {c.location.area}. {c.location.detail}
              </span>
            </p>
            {loc?.photo && <LandmarkPhoto id={loc.photo} name={loc.photoOf ?? loc.place} />}
            {loc ? (
              <MapCrop loc={loc} />
            ) : (
              <p className="rounded-lg border border-dashed border-line px-4 py-6 text-center text-sm text-muted">Stedet er ikke kjent ennå.</p>
            )}
          </section>

          <section>
            <H2>Slik får du den i garasjen</H2>
            <Steps items={c.steps} />
          </section>

          {c.tips && c.tips.length > 0 && (
            <section>
              <H2>Tips</H2>
              <Bullets items={c.tips} />
            </section>
          )}

          <Sources urls={c.sources} />
        </div>
      </Article>
    </div>
  )
}
