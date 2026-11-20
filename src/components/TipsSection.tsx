import { tips } from '../data/extras'
import type { Tip } from '../data/types'

const catStyle: Record<Tip['category'], string> = {
  Viktig: 'text-red-300 bg-red-500/10 ring-red-500/30',
  Penger: 'text-emerald-300 bg-emerald-500/10 ring-emerald-500/30',
  Progresjon: 'text-ocean-400 bg-ocean-400/10 ring-ocean-400/30',
  Trofeer: 'text-yellow-300 bg-yellow-400/10 ring-yellow-400/30',
}

export function TipsSection() {
  return (
    <section id="tips" className="scroll-mt-24">
      <h2 className="mb-1 font-display text-4xl tracking-wide sm:text-5xl">Før du begynner</h2>
      <p className="mb-5 text-sm text-zinc-400">
        Les dette før du starter. Flere ting i spillet kan ikke gjøres om senere.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tips.map((t) => (
          <div key={t.title} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <span className={`rounded-full px-2 py-0.5 text-xs ring-1 ${catStyle[t.category]}`}>
              {t.category}
            </span>
            <h3 className="mt-2 font-semibold">{t.title}</h3>
            <p className="mt-1 text-sm text-zinc-400">{t.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
