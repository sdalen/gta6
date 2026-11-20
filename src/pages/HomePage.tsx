import { chapters } from '../data/chapters'
import { collectibles, itemId } from '../data/collectibles'
import { href } from '../hooks/useRoute'
import { Icon, type IconName } from '../components/Icon'
import { InstallButton } from '../components/InstallButton'
import { Checkbox, ProgressBar } from '../components/ui'
import { nextDeadline } from '../data/reminders'

const totalMissions = chapters.reduce((n, c) => n + c.missions.length, 0)
const totalItems = collectibles.reduce((n, c) => n + c.items.length, 0)

export function HomePage({ done, onToggle }: { done: Set<string>; onToggle: (id: string) => void }) {
  const completed = chapters.reduce((n, c) => n + c.missions.filter((m) => done.has(m.id)).length, 0)
  const collected = collectibles.reduce((n, c) => n + c.items.filter((_, i) => done.has(itemId(c.id, i))).length, 0)
  const nextChapter = chapters.find((c) => c.missions.some((m) => !done.has(m.id)))
  const nextMission = nextChapter?.missions.find((m) => !done.has(m.id))
  const pct = Math.round((completed / totalMissions) * 100)
  const deadline = nextDeadline(done)

  const links: { to: string; icon: IconName; title: string; sub: string }[] = [
    { to: href('oppdrag'), icon: 'book', title: 'Hovedoppdrag', sub: `${completed} av ${totalMissions} fullført` },
    { to: href('samle'), icon: 'compass', title: 'Samleobjekter', sub: `${collected} av ${totalItems} funnet` },
    { to: href('valgfritt'), icon: 'star', title: 'Valgfrie oppdrag', sub: 'Sideoppdrag og Strangers & Freaks' },
    { to: href('penger'), icon: 'coins', title: 'Pengestrategi', sub: 'Hvordan tjene mest, kapittel for kapittel' },
    { to: href('tips'), icon: 'bulb', title: 'Før du begynner', sub: 'Ting du ikke kan gjøre om senere' },
  ]

  return (
    <div>
      <header className="pb-12 pt-6 sm:pt-12">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-accent">Leonida · Vice City</p>
        <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">GTA VI på norsk</h1>
        <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted">
          Gjennomgang av hele historien, samleobjekter og tips. Huk av underveis, så husker appen hvor du er.
        </p>
        <InstallButton />
      </header>

      <section className="mb-12">
        <div className="mb-3 flex items-baseline justify-between">
          <span className="text-sm text-muted">Fremdrift i historien</span>
          <span className="text-2xl font-semibold tabular-nums text-ink">{pct} %</span>
        </div>
        <ProgressBar value={completed} total={totalMissions} />
        {nextChapter && nextMission && (
          <a
            href={href('kapittel', nextChapter.number, nextMission.id)}
            className="group mt-6 flex items-center justify-between gap-4 rounded-xl bg-surface p-5 ring-1 ring-zinc-800 transition hover:ring-frame"
          >
            <span>
              <span className="block text-xs uppercase tracking-[0.18em] text-muted">
                Neste · Kapittel {nextChapter.number}
              </span>
              <span className="mt-1 block text-lg font-medium text-ink">{nextMission.name}</span>
            </span>
            <Icon name="right" className="size-5 text-accent transition group-hover:translate-x-0.5" />
          </a>
        )}
      </section>

      {deadline && (
        <section className="mb-12 rounded-xl border border-red-400/30 bg-red-400/[0.06] p-5">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-red-400">Gjør dette først</p>
          <h2 className="mt-1 text-lg font-semibold text-ink">
            Før du starter {deadline.mission.name}
            <span className="font-normal text-muted"> · Kapittel {deadline.chapter}</span>
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-zinc-950/40 px-3 py-2.5 ring-1 ring-white/5">
              <div className="text-2xl font-semibold tabular-nums text-ink">{deadline.missionsBefore}</div>
              <div className="text-xs text-muted">oppdrag igjen før du er der</div>
            </div>
            <div className="rounded-lg bg-zinc-950/40 px-3 py-2.5 ring-1 ring-white/5">
              <div className="text-2xl font-semibold tabular-nums text-ink">
                {deadline.open.length}
                <span className="text-base font-normal text-muted"> av {deadline.total}</span>
              </div>
              <div className="text-xs text-muted">gjenstår av ting som forsvinner etter</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted">Etter {deadline.mission.name} kan dette være borte for godt:</p>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {deadline.open.map((r) => (
              <li key={r.key} className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onToggle(r.doneKey)}
                  aria-label={`Merk ${r.label} som gjort`}
                  className="group -m-2 p-2"
                >
                  <Checkbox checked={false} />
                </button>
                {r.to ? (
                  <a href={r.to} className="group flex flex-1 items-center gap-3 py-3">
                    <span className="flex-1">
                      <span className="block text-[15px] text-ink">{r.label}</span>
                      <span className="text-xs text-muted">{r.kind}</span>
                    </span>
                    <Icon name="right" className="size-4 text-faint transition group-hover:translate-x-0.5 group-hover:text-ink-soft" />
                  </a>
                ) : (
                  <button type="button" onClick={() => onToggle(r.doneKey)} className="flex-1 py-3 text-left">
                    <span className="block text-[15px] text-ink">{r.label}</span>
                    <span className="text-xs text-muted">{r.kind}</span>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      <ul className="divide-y divide-line border-y border-line">
        {links.map((l) => (
          <li key={l.to}>
            <a href={l.to} className="group flex items-center gap-4 py-4">
              <Icon name={l.icon} className="size-5 text-muted transition group-hover:text-accent" />
              <span className="flex-1">
                <span className="block text-[15px] font-medium text-ink">{l.title}</span>
                <span className="text-sm text-muted">{l.sub}</span>
              </span>
              <Icon name="right" className="size-4 text-faint transition group-hover:translate-x-0.5 group-hover:text-ink-soft" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
