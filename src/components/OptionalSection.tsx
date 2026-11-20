import { optionalMissions, questlines, questlineTrophies } from '../data/extras'

export function OptionalSection() {
  return (
    <section id="valgfritt" className="scroll-mt-24">
      <h2 className="mb-1 font-display text-4xl tracking-wide sm:text-5xl">Valgfrie oppdrag</h2>
      <p className="mb-5 text-sm text-zinc-400">
        Oppdrag som ikke er en del av hovedhistorien. De merket «Kan gå tapt» må gjøres i riktig kapittel.
      </p>

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-wider text-zinc-400">
            <tr>
              <th className="px-4 py-2">Oppdrag</th>
              <th className="px-4 py-2">Kap.</th>
              <th className="px-4 py-2">Merknad</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {optionalMissions.map((o) => (
              <tr key={o.name}>
                <td className="px-4 py-2 font-medium">
                  {o.name}
                  {o.missable && (
                    <span className="ml-2 whitespace-nowrap rounded-full bg-red-500/15 px-2 py-0.5 text-xs text-red-300 ring-1 ring-red-500/30">
                      Kan gå tapt
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 text-zinc-400">{o.chapter}</td>
                <td className="px-4 py-2 text-zinc-400">
                  {o.character && <span className="text-zinc-300">{o.character}: </span>}
                  {o.note}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div>
          <h3 className="mb-2 font-display text-2xl tracking-wide">Strangers &amp; Freaks</h3>
          <p className="mb-3 text-sm text-zinc-400">
            Troféet krever 8 historier. Dette er hvem som teller ifølge tidlige guider.
          </p>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {questlines.map((q) => (
              <li
                key={q.giver}
                className="flex items-center justify-between gap-2 rounded-lg border border-white/10 px-3 py-2"
                title={q.note}
              >
                <span>{q.giver}</span>
                <span
                  className={
                    q.countsForTrophy === true
                      ? 'text-emerald-400'
                      : q.countsForTrophy === false
                        ? 'text-zinc-600'
                        : 'text-yellow-300'
                  }
                >
                  {q.countsForTrophy === true ? 'Teller' : q.countsForTrophy === false ? 'Teller ikke' : 'Usikkert'}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-2 font-display text-2xl tracking-wide">Trofeer fra oppdragsserier</h3>
          <ul className="space-y-2 text-sm">
            {questlineTrophies.map((t) => (
              <li
                key={t.trophy}
                className="flex items-center justify-between gap-3 rounded-lg border border-white/10 px-3 py-2"
              >
                <span>{t.questline}</span>
                <span className="text-yellow-300">🏆 {t.trophy}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
