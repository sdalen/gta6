import { kingOfTheHill, moneyPlan } from '../data/money'

export function MoneySection() {
  return (
    <section id="penger" className="scroll-mt-24">
      <h2 className="mb-1 font-display text-4xl tracking-wide sm:text-5xl">Pengestrategi</h2>
      <p className="mb-5 text-sm text-zinc-400">
        Hvordan tjene penger kapittel for kapittel. Beløpene er anslag fra guider publisert rett etter lansering.
      </p>

      <div className="mb-6 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
        <h3 className="mb-2 font-semibold text-emerald-300">Kortversjonen</h3>
        <ol className="list-decimal space-y-1 pl-5 text-sm text-zinc-300 marker:text-emerald-500">
          {kingOfTheHill.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ol>
      </div>

      <div className="space-y-6">
        {moneyPlan.map((p) => (
          <div key={p.phase} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
            <div className="flex flex-wrap items-baseline gap-x-3">
              <h3 className="font-display text-3xl tracking-wide">{p.phase}</h3>
              <span className="font-mono text-xs uppercase tracking-widest text-sunset-400">{p.chapters}</span>
            </div>
            <p className="mb-4 text-sm text-zinc-400">{p.headline}</p>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {p.methods.map((m) => (
                <div key={m.name} className="rounded-lg border border-white/10 p-3">
                  <h4 className="font-semibold">{m.name}</h4>
                  <dl className="mt-1 grid grid-cols-[auto_1fr] gap-x-2 text-xs">
                    <dt className="text-zinc-500">Utbetaling</dt>
                    <dd className="text-emerald-300">{m.payout}</dd>
                    <dt className="text-zinc-500">Låses opp</dt>
                    <dd className="text-zinc-300">{m.unlock}</dd>
                  </dl>
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-zinc-400 marker:text-zinc-600">
                    {m.how.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <ul className="mt-4 space-y-1 text-sm">
              {p.rules.map((r) => (
                <li key={r} className="flex gap-2 text-zinc-300">
                  <span className="text-sunset-400">→</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
