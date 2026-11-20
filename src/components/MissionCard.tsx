import type { Character, Mission } from '../data/types'
import { Callout, Checkbox } from './ui'
import { remindersFor, unlockedBy } from '../data/reminders'
import { Icon } from './Icon'

const charDot: Record<Character, string> = {
  Lucia: 'bg-pink-400',
  Jason: 'bg-sky-400',
  Begge: 'bg-accent',
}

interface Props {
  mission: Mission
  index: number
  done: boolean
  spoilers: boolean
  onToggle: () => void
  progress?: Set<string>
}

export function MissionCard({ mission, index, done, spoilers, onToggle, progress }: Props) {
  const reminders = remindersFor(mission.id)
  const unlocks = unlockedBy(mission.id)
  return (
    <li id={mission.id} className="scroll-mt-24 py-6">
      <div className="flex items-start gap-4">
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={done}
          aria-label={done ? `Merk ${mission.name} som ikke fullført` : `Merk ${mission.name} som fullført`}
          className="group mt-0.5"
        >
          <Checkbox checked={done} />
        </button>

        <div className={`min-w-0 flex-1 transition ${done ? 'opacity-40' : ''}`}>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="text-[17px] font-medium text-ink">{mission.name}</h3>
            <span className="text-xs tabular-nums text-faint">#{index}</span>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
            {mission.character && (
              <span className="inline-flex items-center gap-1.5">
                <span className={`size-1.5 rounded-full ${charDot[mission.character]}`} />
                {mission.character}
              </span>
            )}
            {mission.task && <span>«{mission.task}»</span>}
            {mission.tag && <span className="font-medium text-amber-300">{mission.tag}</span>}
          </div>

          <div className="mt-4 space-y-4">
            {reminders.length > 0 && (
              <Callout tone="warn" title="Husk før du starter:">
                <ul className="mt-1.5 space-y-1">
                  {reminders.map((r) => {
                    const ok = !!r.doneKey && !!progress?.has(r.doneKey)
                    return (
                      <li key={r.key} className="flex items-baseline gap-2">
                        <span className={ok ? 'text-emerald-400' : 'text-faint'}>{ok ? '✓' : '○'}</span>
                        {r.to ? (
                          <a href={r.to} className={`hover:text-ink hover:underline ${ok ? 'text-muted line-through' : ''}`}>
                            {r.label}
                          </a>
                        ) : (
                          <span className={ok ? 'text-muted line-through' : ''}>{r.label}</span>
                        )}
                        <span className="text-xs text-faint">{r.kind}</span>
                      </li>
                    )
                  })}
                </ul>
              </Callout>
            )}
            {mission.warning && (
              <Callout tone="warn" title="Før du starter:">
                {mission.warning}
              </Callout>
            )}

            {spoilers ? (
              <>
                <p className="text-[15px] leading-relaxed text-ink-soft">{mission.summary}</p>
                {mission.steps && (
                  <ol className="space-y-1.5 text-sm leading-relaxed text-muted">
                    {mission.steps.map((s, i) => (
                      <li key={s} className="flex gap-3">
                        <span className="w-4 shrink-0 text-right tabular-nums text-faint">{i + 1}</span>
                        {s}
                      </li>
                    ))}
                  </ol>
                )}
              </>
            ) : (
              <p className="text-sm text-faint">Handlingen er skjult</p>
            )}

            {unlocks.map((o) => (
              <Callout key={o.name} tone="neutral" title="Etter dette:">
                <span className="inline-flex flex-wrap items-center gap-x-1.5">
                  {o.hourglass && <Icon name="hourglass" className="size-3.5 text-amber-300" />}
                  <a href="#/valgfritt" className="font-medium text-ink hover:underline">
                    {o.name}
                  </a>
                  dukker opp. {o.note}
                </span>
              </Callout>
            ))}
            {mission.tip && (
              <Callout tone="accent" title="Tips:">
                {mission.tip}
              </Callout>
            )}
          </div>
        </div>
      </div>
    </li>
  )
}
