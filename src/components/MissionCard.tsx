import type { Character, Mission } from '../data/types'

const charStyle: Record<Character, string> = {
  Lucia: 'bg-vice-500/15 text-vice-400 ring-vice-500/30',
  Jason: 'bg-ocean-400/15 text-ocean-400 ring-ocean-400/30',
  Begge: 'bg-sunset-500/15 text-sunset-400 ring-sunset-500/30',
}

interface Props {
  mission: Mission
  index: number
  done: boolean
  spoilers: boolean
  onToggle: () => void
}

export function MissionCard({ mission, index, done, spoilers, onToggle }: Props) {
  return (
    <article
      id={mission.id}
      className={`group rounded-xl border p-4 transition sm:p-5 ${
        done
          ? 'border-emerald-500/20 bg-emerald-500/5 opacity-70'
          : 'border-white/10 bg-white/[0.03] hover:border-white/20'
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={done}
          aria-label={done ? `Merk ${mission.name} som ikke fullført` : `Merk ${mission.name} som fullført`}
          className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-md border text-sm transition ${
            done
              ? 'border-emerald-400 bg-emerald-500 text-zinc-950'
              : 'border-white/25 hover:border-sunset-400'
          }`}
        >
          {done && '✓'}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="font-mono text-xs text-zinc-500">#{index}</span>
            <h3 className={`font-semibold ${done ? 'line-through decoration-emerald-400/60' : ''}`}>
              {mission.name}
            </h3>
            {mission.character && (
              <span className={`rounded-full px-2 py-0.5 text-xs ring-1 ${charStyle[mission.character]}`}>
                {mission.character}
              </span>
            )}
            {mission.tag && (
              <span className="rounded-full bg-yellow-400/15 px-2 py-0.5 text-xs text-yellow-300 ring-1 ring-yellow-400/30">
                {mission.tag}
              </span>
            )}
          </div>
          {mission.task && (
            <p className="mt-0.5 text-xs text-zinc-500">Oppgave i spillet: «{mission.task}»</p>
          )}

          {mission.warning && (
            <p className="mt-3 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              <strong className="font-semibold">⚠ Før du starter:</strong> {mission.warning}
            </p>
          )}

          {spoilers ? (
            <div className="mt-2 space-y-2 text-sm text-zinc-300">
              <p>{mission.summary}</p>
              {mission.steps && (
                <ol className="list-decimal space-y-0.5 pl-5 text-zinc-400 marker:text-zinc-600">
                  {mission.steps.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
              )}
            </div>
          ) : (
            <p className="mt-2 text-sm italic text-zinc-600">Handlingen er skjult (spoilerfri modus)</p>
          )}

          {mission.tip && (
            <p className="mt-3 rounded-lg bg-sunset-500/10 px-3 py-2 text-sm text-sunset-50/90">
              <strong className="text-sunset-400">Tips:</strong> {mission.tip}
            </p>
          )}
        </div>
      </div>
    </article>
  )
}
