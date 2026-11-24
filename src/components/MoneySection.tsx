import { kingOfTheHill, moneyPlan } from '../data/money'
import { PageHeader, SectionLabel } from './ui'

export function MoneySection() {
  return (
    <div>
      <PageHeader eyebrow="Økonomi" title="Pengestrategi">
        Hvordan tjene penger kapittel for kapittel. Beløpene er anslag fra guider publisert rett etter lansering.
      </PageHeader>

      <section className="mb-14">
        <SectionLabel>Kortversjonen</SectionLabel>
        <ol className="space-y-3">
          {kingOfTheHill.map((r, i) => (
            <li key={r} className="flex gap-4 text-[15px] leading-relaxed text-ink-soft">
              <span className="w-4 shrink-0 text-right font-medium tabular-nums text-accent">{i + 1}</span>
              {r}
            </li>
          ))}
        </ol>
      </section>

      <div className="space-y-14">
        {moneyPlan.map((p) => (
          <section key={p.phase}>
            <SectionLabel>
              {p.phase} · {p.chapters}
            </SectionLabel>
            <p className="mb-5 text-lg font-medium text-ink">{p.headline}</p>

            <div className="divide-y divide-line border-y border-line">
              {p.methods.map((m) => (
                <div key={m.name} className="py-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-[15px] font-medium text-ink">{m.name}</h3>
                    <span className="text-sm tabular-nums text-ok">{m.payout}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted">Låses opp: {m.unlock}</p>
                  <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-muted">
                    {m.how.map((h) => (
                      <li key={h} className="flex gap-3">
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-faint" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <ul className="mt-5 space-y-2 text-sm leading-relaxed text-ink-soft">
              {p.rules.map((r) => (
                <li key={r} className="border-l-2 border-accent/60 pl-4">
                  {r}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
