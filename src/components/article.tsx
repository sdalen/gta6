/** Byggeklosser for artikkelsider (glitcher, biler). */

export function Steps({ items }: { items: string[] }) {
  return (
    <ol className="relative space-y-6 border-l border-line pl-8">
      {items.map((s, i) => (
        <li key={s} className="relative text-[17px] leading-relaxed text-ink-soft">
          <span className="absolute -left-[2.85rem] top-0 grid size-7 place-items-center rounded-full bg-paper font-serif text-sm font-semibold text-accent ring-1 ring-accent/40">
            {i + 1}
          </span>
          {s}
        </li>
      ))}
    </ol>
  )
}

export function Bullets({ items, tone }: { items: string[]; tone?: 'warn' }) {
  return (
    <ul className="space-y-2.5">
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-[17px] leading-relaxed text-ink-soft">
          <span className={`mt-3 size-1.5 shrink-0 rounded-full ${tone === 'warn' ? 'bg-warn' : 'bg-accent'}`} />
          {t}
        </li>
      ))}
    </ul>
  )
}

export function Facts({ rows }: { rows: [string, string | null | undefined][] }) {
  const shown = rows.filter((r): r is [string, string] => !!r[1])
  if (!shown.length) return null
  return (
    <dl className="grid gap-x-10 gap-y-5 border-y border-line py-6 sm:grid-cols-2">
      {shown.map(([k, v]) => (
        <div key={k}>
          <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{k}</dt>
          <dd className="mt-1 text-[15px] leading-relaxed text-ink">{v}</dd>
        </div>
      ))}
    </dl>
  )
}

/** Kildene vises som domenenavn, ikke som lenker: innholdet skal ligge i appen. */
export function Sources({ urls }: { urls?: string[] }) {
  if (!urls?.length) return null
  const names = [...new Set(urls.map((u) => {
    try {
      return new URL(u).hostname.replace(/^www\./, '')
    } catch {
      return u
    }
  }))]
  return <p className="border-t border-line pt-6 text-sm leading-relaxed text-faint">Basert på: {names.join(' · ')}</p>
}
