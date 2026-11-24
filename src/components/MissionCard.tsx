import type { Character, Mission } from '../data/types'
import { Callout, Checkbox } from './ui'
import { chainFor, chainName } from '../data/chains'
import { duringFor, remindersFor, unlockedBy, type Reminder } from '../data/reminders'
import { Icon } from './Icon'
import { ChoiceBox } from './ChoiceBox'

const charDot: Record<Character, string> = {
  Lucia: 'bg-pink-400',
  Jason: 'bg-sky-400',
  Begge: 'bg-accent',
}

export function ReminderList({ items, progress, onToggle }: { items: Reminder[]; progress?: Set<string>; onToggle?: (id: string) => void }) {
  return (
    <ul className="mt-1.5 space-y-1">
      {items.map((r) => {
        const ok = !!r.doneKey && !!progress?.has(r.doneKey)
        return (
          <li key={r.key} className="flex items-baseline gap-2">
            {onToggle ? (
              <button
                type="button"
                onClick={() => onToggle(r.doneKey)}
                aria-pressed={ok}
                aria-label={ok ? `Merk ${r.label} som ikke gjort` : `Merk ${r.label} som gjort`}
                className="group relative top-[3px] shrink-0 self-start"
              >
                <span
                  className={`grid size-[18px] place-items-center rounded-full border-2 transition ${
                    ok ? 'border-ok bg-ok text-on-ok' : 'border-frame group-hover:border-ok'
                  }`}
                >
                  {ok && <Icon name="check" className="size-2.5 [stroke-width:3.5]" />}
                </span>
              </button>
            ) : (
              <span className={ok ? 'text-ok' : 'text-faint'}>{ok ? '✓' : '○'}</span>
            )}
            {r.to ? (
              <a href={r.to} className={`hover:text-ink hover:underline ${ok ? 'text-muted line-through' : ''}`}>
                {r.label}
              </a>
            ) : onToggle ? (
              <button type="button" onClick={() => onToggle(r.doneKey)} className={`text-left hover:text-ink ${ok ? 'text-muted line-through' : ''}`}>
                {r.label}
              </button>
            ) : (
              <span className={ok ? 'text-muted line-through' : ''}>{r.label}</span>
            )}
            <span className="text-xs text-faint">
              {r.kind}
              {r.forMission && ` · før ${r.forMission}`}
            </span>
          </li>
        )
      })}
    </ul>
  )
}

interface Props {
  mission: Mission
  index: number
  done: boolean
  spoilers: boolean
  onToggle: () => void
  progress?: Set<string>
  /** Huker av en påminnelse (samleobjekt, forberedelse) direkte i listen. */
  onToggleItem?: (id: string) => void
}

export function MissionCard({ mission, index, done, spoilers, onToggle, progress, onToggleItem }: Props) {
  const reminders = remindersFor(mission.id)
  const during = duringFor(mission.id)
  const unlocks = unlockedBy(mission.id)
  const chain = chainFor(mission.id)
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
            {mission.tag && <span className="font-medium text-gold">{mission.tag}</span>}
            {chain && chain.pos > 0 && (
              <span className="font-medium text-accent">Starter rett etter {chainName(chain.chain.missions[chain.pos - 1])}</span>
            )}
          </div>

          <div className="mt-4 space-y-4">
            {chain && chain.pos === 0 && (
              <Callout tone={chain.chain.lockIn ? 'warn' : 'accent'} title={chain.chain.lockIn ? 'Ingen vei tilbake:' : 'Går rett over i neste:'}>
                <span className="font-medium text-ink">{chain.chain.missions.map(chainName).join(' → ')}</span>. Du får ikke gjort noe mellom
                oppdragene, så alt under «Husk før du starter» gjelder fra nå. {chain.chain.note}
                {chain.chain.confidence === 'middels' && <span className="text-faint"> Beskrevet av én guide.</span>}
              </Callout>
            )}
            {reminders.length > 0 && (
              <Callout tone="warn" title="Husk før du starter:">
                <ReminderList items={reminders} progress={progress} onToggle={onToggleItem} />
              </Callout>
            )}
            {during.length > 0 && (
              <Callout tone="accent" title="Underveis i oppdraget:">
                <ReminderList items={during} progress={progress} onToggle={onToggleItem} />
              </Callout>
            )}
            {mission.warning && (
              <Callout tone="warn" title="Før du starter:">
                {mission.warning}
              </Callout>
            )}
            {mission.choices && <ChoiceBox choices={mission.choices} />}

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
                  {o.hourglass && <Icon name="hourglass" className="size-3.5 text-gold" />}
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
