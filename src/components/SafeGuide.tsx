import guide from '../data/safeGuide.json'

/** Hvordan safer virker, og om samme sted kan ranes igjen. Fra flere guider (nov. 2026). */
export function SafeGuide() {
  const sections = [
    { title: 'Kan samme butikk ranes flere ganger?', items: guide.repeatRobbery, open: true },
    { title: 'Slik åpner du en safe uten kode', items: guide.howSafesWork, open: false },
  ]
  return (
    <div className="mb-12 space-y-4">
      {sections.map((s) => (
        <details key={s.title} open={s.open} className="group rounded-lg bg-surface ring-1 ring-line">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-serif text-xl text-ink">
            {s.title}
            <span className="text-accent transition group-open:rotate-45">+</span>
          </summary>
          <div className="space-y-5 border-t border-line px-5 py-5">
            {s.items.map((it) => (
              <div key={it.title}>
                <h3 className="font-semibold text-ink">{it.title}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">{it.body}</p>
              </div>
            ))}
          </div>
        </details>
      ))}
    </div>
  )
}
