import { glitchRules, glitches, statusText, type Glitch } from '../data/glitches'
import { getLocation } from '../data/mapLocations'
import { href } from '../hooks/useRoute'
import { Icon } from '../components/Icon'
import { MapCrop } from '../components/MapCrop'
import { LandmarkPhoto } from '../components/LandmarkPhoto'
import { Article, Callout, H2, MoreLinks, PageHeader } from '../components/ui'
import { Bullets, Facts, Sources, Steps } from '../components/article'
import { NotFound } from './NotFound'

function StatusBadge({ g }: { g: Glitch }) {
  if (g.myth) return <span className="rounded-full bg-surface px-2.5 py-0.5 text-xs font-semibold text-muted ring-1 ring-line">Myte</span>
  const tone = { virker: 'text-ok ring-ok/40', patchet: 'text-warn ring-warn/40', usikkert: 'text-gold ring-gold/40' }[g.status]
  return <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${tone}`}>{statusText[g.status]}</span>
}

export function GlitchesPage() {
  const real = glitches.filter((g) => !g.myth)
  const groups = [
    { title: 'Virker nå', items: real.filter((g) => g.status === 'virker') },
    { title: 'Usikre', items: real.filter((g) => g.status === 'usikkert') },
    { title: 'Fjernet i oppdateringer', items: real.filter((g) => g.status === 'patchet') },
    { title: 'Myter', items: glitches.filter((g) => g.myth) },
  ].filter((gr) => gr.items.length)

  return (
    <div>
      <PageHeader eyebrow="Penger" title="Pengeglitcher">
        Alle kjente glitcher og triks for raske penger, med kart og steg for steg. Status gjelder etter oppdatering 01.002.002
        (23. nov. 2026). Rockstar kan fjerne dem når som helst.
      </PageHeader>

      <section className="mb-14">
        <H2>Før du begynner</H2>
        <ul className="space-y-3">
          {glitchRules.map((r) => (
            <li key={r} className="border-l-2 border-accent pl-4 text-[17px] leading-relaxed text-ink-soft">
              {r}
            </li>
          ))}
        </ul>
      </section>

      {groups.map((gr) => (
        <section key={gr.title} className="mb-12">
          <H2>{gr.title}</H2>
          <ul className="divide-y divide-line border-y border-line">
            {gr.items.map((g) => (
              <li key={g.id}>
                <a href={href('glitcher', g.id)} className="group flex items-center gap-4 py-5">
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="font-serif text-xl text-ink transition group-hover:text-accent">{g.name}</span>
                      <StatusBadge g={g} />
                    </span>
                    <span className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
                      <span className="inline-flex items-center gap-1.5">
                        <Icon name="pin" className="size-3.5 text-faint" />
                        {g.location.place}
                      </span>
                      {g.payout && <span className="line-clamp-1">{g.payout.split('.')[0]}</span>}
                    </span>
                  </span>
                  <Icon name="right" className="size-4 shrink-0 text-faint transition group-hover:translate-x-0.5 group-hover:text-accent" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <p className="text-sm leading-relaxed text-faint">
        Se også{' '}
        <a href={href('penger')} className="text-accent underline underline-offset-4">
          pengestrategien
        </a>{' '}
        for lovlige måter å tjene penger på, kapittel for kapittel.
      </p>
    </div>
  )
}

export function GlitchPage({ id }: { id: string }) {
  const g = glitches.find((x) => x.id === id)
  if (!g) return <NotFound />
  const loc = getLocation(`glitch:${g.id}`)

  return (
    <div>
      <PageHeader back={{ href: href('glitcher'), label: 'Pengeglitcher' }} eyebrow={g.myth ? 'Myte' : `Pengeglitch · ${statusText[g.status]}`} title={g.name}>
        {g.location.detail}
      </PageHeader>

      <Article
        aside={
          <MoreLinks
            links={glitches.map((x) => ({
              href: href('glitcher', x.id),
              kicker: x.myth ? 'Myte' : statusText[x.status],
              label: x.name,
              active: x.id === g.id,
            }))}
          />
        }
      >
        <div className="space-y-12">
          {g.patchNote && (
            <Callout tone={g.status === 'virker' ? 'accent' : 'warn'} title="Status.">
              {g.patchNote}
            </Callout>
          )}

          <Facts
            rows={[
              ['Utbetaling', g.payout],
              ['Per time', g.perHour],
              ['Låses opp', g.unlock],
              ['Plattform', g.platforms],
            ]}
          />

          <section>
            <H2>Hvor</H2>
            <p className="mb-5 flex gap-2 text-[17px] leading-relaxed text-ink-soft">
              <Icon name="pin" className="mt-1.5 size-4 shrink-0 text-accent" />
              <span>
                <span className="font-medium text-ink">{g.location.place}</span>, {g.location.area}. {g.location.detail}
              </span>
            </p>
            {loc?.photo && <LandmarkPhoto id={loc.photo} name={loc.photoOf ?? loc.place} />}
            {loc && <MapCrop loc={loc} />}
          </section>

          {g.requirements && g.requirements.length > 0 && (
            <section>
              <H2>Du trenger</H2>
              <Bullets items={g.requirements} />
            </section>
          )}

          <section>
            <H2>Slik gjør du</H2>
            <Steps items={g.steps} />
          </section>

          {g.risks && g.risks.length > 0 && (
            <section>
              <H2>Risiko</H2>
              <Bullets items={g.risks} tone="warn" />
            </section>
          )}

          {g.tips && g.tips.length > 0 && (
            <section>
              <H2>Tips</H2>
              <Bullets items={g.tips} />
            </section>
          )}

          <Sources urls={g.sources} />
        </div>
      </Article>
    </div>
  )
}
