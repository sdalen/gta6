import { challengeCategories, challengeId, raceChallenges, raceId } from '../data/challenges'
import { href } from '../hooks/useRoute'
import { Icon } from '../components/Icon'
import { Callout, Checkbox, PageHeader, ProgressBar } from '../components/ui'
import { NotFound } from './NotFound'

const TOTAL = challengeCategories.reduce((n, c) => n + c.items.length, 0)

const countDone = (done: Set<string>) =>
  challengeCategories.reduce((n, c) => n + c.items.filter((_, i) => done.has(challengeId(c.id, i))).length, 0)

function Milestones({ value }: { value: number }) {
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between">
        <span className="text-sm text-muted">Fullført</span>
        <span className="text-2xl font-semibold tabular-nums text-ink">
          {value}
          <span className="text-base font-normal text-muted"> av {TOTAL}</span>
        </span>
      </div>
      <div className="relative">
        <ProgressBar value={value} total={TOTAL} />
        {[50, 70].map((m) => (
          <span key={m} className="absolute -top-1 h-3 w-px bg-ink-soft" style={{ left: `${(m / TOTAL) * 100}%` }} />
        ))}
      </div>
      <div className="relative mt-2 h-4 whitespace-nowrap text-[11px] text-muted">
        <span className="absolute -translate-x-1/2" style={{ left: `${(50 / TOTAL) * 100}%` }}>
          50 · trofé
        </span>
        <span className="absolute -translate-x-1/2" style={{ left: `${(70 / TOTAL) * 100}%` }}>
          70 · 100 %
        </span>
      </div>
    </div>
  )
}

export function ChallengesPage({ done }: { done: Set<string> }) {
  const total = countDone(done)
  const races = raceChallenges.filter((_, i) => done.has(raceId(i))).length

  return (
    <div>
      <PageHeader back={{ href: href('samle'), label: 'Samleobjekter' }} eyebrow="Progress → Challenges" title="Challenges">
        80 utfordringer i 8 kategorier. Alle er tilgjengelige fra starten, og ingen forsvinner etter et oppdrag. 50 gir
        troféet «One Last Thing», og 70 trengs for 100 %. Du kan altså hoppe over de 10 vanskeligste.
      </PageHeader>

      <section className="mb-12">
        <Milestones value={total} />
      </section>

      <ul className="divide-y divide-line border-y border-line">
        {challengeCategories.map((cat) => {
          const n = cat.items.filter((_, i) => done.has(challengeId(cat.id, i))).length
          return (
            <li key={cat.id}>
              <a href={href('utfordringer', cat.id)} className="group flex items-center gap-4 py-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-surface text-muted ring-1 ring-line transition group-hover:text-accent">
                  <Icon name={cat.icon} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-medium text-ink">{cat.name}</span>
                  <span className="mt-1.5 flex items-center gap-3">
                    <ProgressBar value={n} total={cat.items.length} className="max-w-40 flex-1" />
                    <span className="text-xs tabular-nums text-muted">
                      {n}/{cat.items.length}
                    </span>
                  </span>
                </span>
                <Icon name="right" className="size-4 text-faint transition group-hover:translate-x-0.5 group-hover:text-ink-soft" />
              </a>
            </li>
          )
        })}
        <li>
          <a href={href('utfordringer', 'lop')} className="group flex items-center gap-4 py-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-surface text-muted ring-1 ring-line transition group-hover:text-accent">
              <Icon name="trophy" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[15px] font-medium text-ink">Løpsutfordringer</span>
              <span className="mt-1.5 flex items-center gap-3">
                <ProgressBar value={races} total={10} className="max-w-40 flex-1" />
                <span className="text-xs tabular-nums text-muted">{races}/10 gull</span>
              </span>
            </span>
            <Icon name="right" className="size-4 text-faint transition group-hover:translate-x-0.5 group-hover:text-ink-soft" />
          </a>
        </li>
      </ul>
    </div>
  )
}

export function ChallengeCategoryPage({ id, done, onToggle }: { id: string; done: Set<string>; onToggle: (id: string) => void }) {
  const cat = challengeCategories.find((c) => c.id === id)
  if (!cat) return <NotFound />
  const n = cat.items.filter((_, i) => done.has(challengeId(cat.id, i))).length

  return (
    <div>
      <PageHeader back={{ href: href('utfordringer'), label: 'Challenges' }} eyebrow={`${n} av ${cat.items.length} fullført`} title={cat.name} />

      <div className="mb-8">
        <Callout tone="accent" title="Belønning.">
          5 fullført: {cat.reward5}. Alle 10: {cat.reward10}.
        </Callout>
      </div>

      <ul className="divide-y divide-line border-y border-line">
        {cat.items.map((ch, i) => {
          const key = challengeId(cat.id, i)
          const isDone = done.has(key)
          return (
            <li key={key}>
              <button type="button" onClick={() => onToggle(key)} aria-pressed={isDone} className="group flex w-full items-start gap-4 py-4 text-left">
                <span className="mt-0.5">
                  <Checkbox checked={isDone} />
                </span>
                <span className={`min-w-0 flex-1 transition ${isDone ? 'opacity-40' : ''}`}>
                  <span className="flex flex-wrap items-baseline gap-x-2">
                    <span className="text-[15px] font-medium text-ink">{ch.name}</span>
                    {ch.skip && <span className="text-xs font-medium text-gold">Kan hoppes over</span>}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-ink-soft">{ch.goal}</span>
                  {ch.tip && <span className="mt-1 block text-sm leading-relaxed text-muted">Tips: {ch.tip}</span>}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
      <p className="mt-6 text-xs leading-relaxed text-faint">
        «Kan hoppes over» er et forslag fra guidene for de lengste og mest presise utfordringene, ikke noe spillet sier.
      </p>
    </div>
  )
}

export function RaceChallengesPage({ done, onToggle }: { done: Set<string>; onToggle: (id: string) => void }) {
  const gold = raceChallenges.filter((_, i) => done.has(raceId(i))).length
  return (
    <div>
      <PageHeader back={{ href: href('utfordringer'), label: 'Challenges' }} eyebrow={`${gold} av 10 gull`} title="Løpsutfordringer">
        13 løp på 7 steder. 10 gullmedaljer trengs for 100 %, så du kan hoppe over 3. Kart → Activities → Racing viser dem.
        Huk av når du har tatt gull.
      </PageHeader>

      <ul className="divide-y divide-line border-y border-line">
        {raceChallenges.map((r, i) => {
          const key = raceId(i)
          const isDone = done.has(key)
          return (
            <li key={key}>
              <button type="button" onClick={() => onToggle(key)} aria-pressed={isDone} className="group flex w-full items-start gap-4 py-4 text-left">
                <span className="mt-0.5">
                  <Checkbox checked={isDone} />
                </span>
                <span className={`min-w-0 flex-1 transition ${isDone ? 'opacity-40' : ''}`}>
                  <span className="block text-[15px] font-medium text-ink">{r.name}</span>
                  <span className="mt-1 flex gap-1.5 text-sm text-muted">
                    <Icon name="pin" className="mt-0.5 size-4 shrink-0 text-faint" />
                    {r.where}
                  </span>
                  <span className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs tabular-nums">
                    <span className="text-gold">Gull {r.gold}</span>
                    <span className="text-ink-soft">Sølv {r.silver}</span>
                    <span className="text-orange-400/80">Bronse {r.bronze}</span>
                  </span>
                  {r.note && <span className="mt-1.5 block text-sm text-muted">{r.note}</span>}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
      <p className="mt-6 text-xs text-faint">Tider og steder: games.gg</p>
    </div>
  )
}
