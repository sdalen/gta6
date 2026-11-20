import { useState } from 'react'
import { chapters } from './data/chapters'
import { useProgress } from './hooks/useProgress'
import { ChapterSection } from './components/ChapterSection'
import { TipsSection } from './components/TipsSection'
import { OptionalSection } from './components/OptionalSection'
import { MoneySection } from './components/MoneySection'

const totalMissions = chapters.reduce((n, c) => n + c.missions.length, 0)
const startIndexes = chapters.map((_, i) =>
  chapters.slice(0, i).reduce((n, c) => n + c.missions.length, 1),
)

export default function App() {
  const { done, toggle, reset } = useProgress()
  const [spoilers, setSpoilers] = useState(true)
  const [query, setQuery] = useState('')

  const completed = chapters.reduce((n, c) => n + c.missions.filter((m) => done.has(m.id)).length, 0)
  const pct = Math.round((completed / totalMissions) * 100)

  const nextMission = chapters.flatMap((c) => c.missions).find((m) => !done.has(m.id))

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,rgba(236,72,153,0.15),transparent_60%)]">
      <header className="px-4 pb-8 pt-12 text-center sm:pt-16">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-sunset-400">Leonida · Vice City</p>
        <h1 className="mt-2 bg-gradient-to-r from-vice-400 via-sunset-400 to-yellow-300 bg-clip-text font-display text-6xl tracking-wide text-transparent sm:text-8xl">
          GTA VI Gjennomgang
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-zinc-400">
          Alle hovedoppdrag i historien, kapittel for kapittel, med tips til hva du bør gjøre underveis. Huk av
          oppdragene etter hvert. Fremdriften lagres i nettleseren.
        </p>
      </header>

      <nav className="sticky top-0 z-20 border-y border-white/10 bg-zinc-950/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-vice-500 to-sunset-400 transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="whitespace-nowrap font-mono text-xs text-zinc-300">
              {completed}/{totalMissions} · {pct}%
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <a href="#tips" className="rounded-md px-2 py-1 text-zinc-300 hover:bg-white/10">
              Tips
            </a>
            {chapters.map((c) => (
              <a key={c.id} href={`#${c.id}`} className="rounded-md px-2 py-1 text-zinc-300 hover:bg-white/10">
                Kap. {c.number}
              </a>
            ))}
            <a href="#valgfritt" className="rounded-md px-2 py-1 text-zinc-300 hover:bg-white/10">
              Valgfritt
            </a>
            <a href="#penger" className="rounded-md px-2 py-1 text-zinc-300 hover:bg-white/10">
              Penger
            </a>
            <div className="ml-auto flex w-full items-center gap-2 sm:w-auto">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Søk etter oppdrag…"
                className="min-w-0 flex-1 rounded-md border border-white/10 bg-white/5 px-3 py-1 text-sm placeholder:text-zinc-600 focus:border-sunset-400 focus:outline-none sm:w-48"
              />
              <label className="flex cursor-pointer items-center gap-1.5 whitespace-nowrap text-xs text-zinc-400">
                <input
                  type="checkbox"
                  checked={!spoilers}
                  onChange={(e) => setSpoilers(!e.target.checked)}
                  className="accent-sunset-500"
                />
                Spoilerfri
              </label>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-5xl space-y-16 px-4 py-10">
        {nextMission && !query && (
          <a
            href={`#${nextMission.id}`}
            className="block rounded-xl border border-sunset-500/30 bg-sunset-500/10 px-4 py-3 text-sm hover:border-sunset-400"
          >
            <span className="text-sunset-400">Neste oppdrag:</span>{' '}
            <strong className="font-semibold">{nextMission.name}</strong> →
          </a>
        )}

        {!query && <TipsSection />}

        {chapters.map((c, i) => (
          <ChapterSection
            key={c.id}
            chapter={c}
            query={query}
            done={done}
            spoilers={spoilers}
            onToggle={toggle}
            startIndex={startIndexes[i]}
          />
        ))}

        {!query && (
          <>
            <OptionalSection />
            <MoneySection />
          </>
        )}
      </main>

      <footer className="border-t border-white/10 px-4 py-8 text-center text-xs text-zinc-500">
        <p>
          Uoffisiell fanguide oversatt og tilpasset fra engelske gjennomganger (IGN m.fl.). Ikke tilknyttet
          Rockstar Games.
        </p>
        <button
          type="button"
          onClick={() => {
            if (confirm('Nullstille all fremdrift?')) reset()
          }}
          className="mt-3 rounded-md border border-white/10 px-3 py-1 text-zinc-400 hover:border-red-500/50 hover:text-red-300"
        >
          Nullstill fremdrift
        </button>
      </footer>
    </div>
  )
}
