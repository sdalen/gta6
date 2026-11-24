import type { Choice } from '../data/types'
import { Icon } from './Icon'

/** Valg i et oppdrag: alternativene, hva de gir, og hvilket som lønner seg. */
export function ChoiceBox({ choices }: { choices: Choice[] }) {
  return (
    <div className="space-y-3">
      {choices.map((c) => (
        <div key={c.question} className="rounded-lg bg-surface p-4 ring-1 ring-line">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">Valg</p>
          <p className="mb-3 text-[15px] font-medium text-ink">{c.question}</p>
          <ul className="space-y-2">
            {c.options.map((o) => (
              <li
                key={o.label}
                className={`flex gap-3 rounded-md p-2.5 text-sm leading-relaxed ${o.best ? 'bg-ok/10 ring-1 ring-ok/40' : ''}`}
              >
                <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${o.best ? 'bg-ok text-on-ok' : 'ring-1 ring-frame'}`}>
                  {o.best && <Icon name="check" className="size-3 [stroke-width:3]" />}
                </span>
                <span>
                  <span className={`font-medium ${o.best ? 'text-ok' : 'text-ink'}`}>
                    {o.label}
                    {o.best && ' · lønner seg'}
                  </span>
                  <span className="block text-ink-soft">{o.result}</span>
                </span>
              </li>
            ))}
          </ul>
          {c.tip && <p className="mt-3 text-sm leading-relaxed text-ink-soft">{c.tip}</p>}
          {c.confidence === 'middels' && <p className="mt-2 text-xs text-faint">Beskrevet av én guide.</p>}
        </div>
      ))}
    </div>
  )
}
