import { optionalMissions, questlines, questlineTrophies } from '../data/extras'
import { href } from '../hooks/useRoute'
import { Icon } from './Icon'
import { PageHeader, SectionLabel } from './ui'

export function OptionalSection() {
  return (
    <div>
      <PageHeader back={{ href: href('oppdrag'), label: 'Hovedoppdrag' }} eyebrow="Utenfor historien" title="Valgfrie oppdrag">
        Sideoppdrag som ikke er en del av hovedhistorien. De merket «kan gå tapt» må gjøres i tide. Timeglass betyr at oppdraget forsvinner hvis du venter for lenge, så ta det med en gang.
      </PageHeader>

      <section className="mb-14">
        <SectionLabel>Oppdrag</SectionLabel>
        <ul className="divide-y divide-line border-y border-line">
          {optionalMissions.map((o) => (
            <li key={o.name} className="flex items-start gap-5 py-4">
              <span className="w-10 shrink-0 text-xs uppercase tracking-wider text-faint">Kap. {o.chapter}</span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <span className="text-[15px] font-medium text-ink">{o.name}</span>
                  {o.hourglass && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-300" title="Timeglass: forsvinner hvis du venter">
                      <Icon name="hourglass" className="size-3.5" /> Timeglass
                    </span>
                  )}
                  {o.missable && <span className="text-xs font-medium text-red-400">kan gå tapt</span>}
                </div>
                <p className="mt-1 text-sm text-muted">
                  {o.character && <span className="text-ink-soft">{o.character}. </span>}
                  {o.note}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid gap-14 lg:grid-cols-2 lg:gap-10">
        <section>
          <SectionLabel>Strangers &amp; Freaks</SectionLabel>
          <p className="mb-4 text-sm text-muted">Troféet krever 8 historier. Disse teller ifølge tidlige guider:</p>
          <ul className="divide-y divide-line border-y border-line text-sm">
            {questlines.map((q) => (
              <li key={q.giver} className="flex items-center justify-between py-2.5" title={q.note}>
                <span className="text-ink">{q.giver}</span>
                <span
                  className={
                    q.countsForTrophy === true
                      ? 'text-emerald-400'
                      : q.countsForTrophy === false
                        ? 'text-faint'
                        : 'text-amber-300'
                  }
                >
                  {q.countsForTrophy === true ? 'Teller' : q.countsForTrophy === false ? 'Teller ikke' : 'Usikkert'}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <SectionLabel>Trofeer fra oppdragsserier</SectionLabel>
          <ul className="divide-y divide-line border-y border-line text-sm">
            {questlineTrophies.map((t) => (
              <li key={t.trophy} className="flex items-center justify-between gap-4 py-2.5">
                <span className="text-ink">{t.questline}</span>
                <span className="inline-flex items-center gap-1.5 text-muted">
                  <Icon name="trophy" className="size-4 text-amber-300" />
                  {t.trophy}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
