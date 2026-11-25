import { useEffect, useState } from 'react'
import { completionOf, optionalMissions, optionalSlug, questlines, questlineTrophies } from '../data/extras'
import { href } from '../hooks/useRoute'
import { Icon } from './Icon'
import { MapCrop } from './MapCrop'
import { StopsGuide } from './StopsGuide'
import { ChoiceBox } from './ChoiceBox'
import { Checkbox, PageHeader, SectionLabel } from './ui'

const CHAPTERS = [...new Set(optionalMissions.map((o) => o.chapter))]

export function OptionalSection({
  done,
  onToggle,
  onSetMany,
  focus,
  chapter,
}: {
  done: Set<string>
  onToggle: (id: string) => void
  onSetMany: (ids: string[], value: boolean) => void
  focus?: string
  /** Viser bare sideoppdragene i dette kapittelet (#/valgfritt/kapittel/3). */
  chapter?: string
}) {
  // Bare oppdrag som teller eller kreves for 100 %.
  const [only100, setOnly100] = useState(false)
  // Bare oppdrag som går tapt (eller har timeglass) hvis du venter.
  const [onlyLost, setOnlyLost] = useState(false)
  const isLost = (o: (typeof optionalMissions)[number]) => !!(o.missable || o.hourglass)
  const lostOpen = optionalMissions.filter((o) => isLost(o) && !done.has(`valgfritt:${o.name}`)).length
  const pool = optionalMissions.filter((o) => (!only100 || completionOf(o.name)) && (!onlyLost || isLost(o)))
  const list = chapter ? pool.filter((o) => o.chapter === chapter) : pool
  // Valgfrie oppgaver mot 100 % som finnes i appen, og hvor mange som er gjort.
  const counting = optionalMissions.filter((o) => completionOf(o.name) === 'teller')
  const countingDone = counting.filter((o) => done.has(`valgfritt:${o.name}`)).length
  // Hvilke oppdrag du har åpnet eller lukket selv. Ellers er gjorte oppdrag lukket og resten åpne.
  const [openState, setOpenState] = useState<Record<string, boolean>>({})
  const setOpen = (name: string, value: boolean) => setOpenState((m) => (m[name] === value ? m : { ...m, [name]: value }))

  // Lenker som #/valgfritt/<slug> hopper rett til oppdraget.
  useEffect(() => {
    if (!focus) return
    const el = document.getElementById(`valgfritt-${focus}`)
    if (!el) return
    el.scrollIntoView({ block: 'start' })
    const name = optionalMissions.find((o) => optionalSlug(o.name) === focus)?.name
    if (name) setOpen(name, true)
  }, [focus])

  return (
    <div>
      <PageHeader
        back={chapter ? { href: href('kapittel', chapter), label: `Kapittel ${chapter}` } : { href: href('oppdrag'), label: 'Hovedoppdrag' }}
        eyebrow={chapter ? `Kapittel ${chapter}` : 'Utenfor historien'}
        title={chapter ? 'Sideoppdrag' : 'Valgfrie oppdrag'}
      >
        Sideoppdrag som ikke er en del av hovedhistorien. Kapittelet viser når oppdraget låses opp. De merket «går tapt» må gjøres i tide. Timeglass betyr at oppdraget forsvinner hvis du venter for lenge, så ta det med en gang.
        <span className="mt-3 block">
          For 100 % må du gjøre 100 valgfrie oppgaver av flere hundre, pluss noen faste krav. «Kreves for 100 %» står fast i sjekklisten. «Teller for 100 %» er én av de valgfrie oppgavene. Ingenting går tapt for 100 %, alt kan tas i fri modus etter historien.
        </span>
      </PageHeader>

      <nav aria-label="Velg kapittel" className="mb-8 flex flex-wrap gap-2 text-sm">
        {[undefined, ...CHAPTERS].map((c) => {
          const active = c === chapter
          const count = c ? pool.filter((o) => o.chapter === c).length : pool.length
          return (
            <a
              key={c ?? 'alle'}
              href={c ? href('valgfritt', 'kapittel', c) : href('valgfritt')}
              aria-current={active ? 'page' : undefined}
              className={`rounded-sm px-3 py-1.5 font-medium ring-1 transition ${
                active ? 'bg-accent text-on-accent ring-accent' : 'text-muted ring-line hover:text-ink hover:ring-frame'
              }`}
            >
              {c ? `Kap. ${c}` : 'Alle'} <span className="tabular-nums opacity-70">{count}</span>
            </a>
          )
        })}
      </nav>

      <div role="group" aria-label="Filter" className="-mt-4 mb-8 flex flex-wrap gap-2 text-sm">
        <button
          type="button"
          onClick={() => setOnly100((v) => !v)}
          aria-pressed={only100}
          className={`inline-flex items-center gap-2 rounded-sm px-3 py-1.5 font-medium ring-1 transition ${
            only100 ? 'bg-ok/10 text-ok ring-ok/40' : 'text-muted ring-line hover:text-ink hover:ring-frame'
          }`}
        >
          <Checkbox checked={only100} tone="green" />
          Teller for 100 %
          <span className="font-normal tabular-nums opacity-80" title={`Spillet krever 100 av ca. 200–300 valgfrie oppgaver. Appen har ${counting.length} av dem (sideoppdragene) og teller bare disse. Meditasjoner, laber og lignende kommer i tillegg.`}>
            {Math.min(countingDone, 100)} av 100 gjort · ca. 200–300 teller
          </span>
        </button>
        <button
          type="button"
          onClick={() => setOnlyLost((v) => !v)}
          aria-pressed={onlyLost}
          className={`inline-flex items-center gap-2 rounded-sm px-3 py-1.5 font-medium ring-1 transition ${
            onlyLost ? 'bg-warn/10 text-warn ring-warn/40' : 'text-muted ring-line hover:text-ink hover:ring-frame'
          }`}
        >
          <Checkbox checked={onlyLost} />
          Går tapt
          <span className="font-normal tabular-nums opacity-80" title="Oppdrag som forsvinner hvis du venter, inkludert de med timeglass.">
            {lostOpen} igjen
          </span>
        </button>
      </div>

      <section className="mb-14">
        <SectionLabel>Oppdrag</SectionLabel>
        {list.length === 0 && <p className="border-y border-line py-6 text-[15px] text-muted">Ingen oppdrag passer filteret her.</p>}
        <ul className="divide-y divide-line border-y border-line">
          {list.map((o) => {
            const key = `valgfritt:${o.name}`
            const checked = done.has(key)
            const hasDetails = !!(o.steps || o.location || o.stops || o.choices)
            const isOpen = openState[o.name] ?? !checked
            return (
            <li key={o.name} id={`valgfritt-${optionalSlug(o.name)}`} className={`scroll-mt-24 ${focus === optionalSlug(o.name) ? 'rounded-lg bg-accent-dim/60' : ''}`}>
              <div className="flex w-full items-start gap-4 py-6 text-left">
              <button
                type="button"
                onClick={() => onToggle(key)}
                aria-pressed={checked}
                aria-label={checked ? `Merk ${o.name} som ikke gjort` : `Merk ${o.name} som gjort`}
                className="mt-0.5"
              >
                <Checkbox checked={checked} tone="green" />
              </button>
              <span className="w-10 shrink-0 pt-2 text-xs uppercase tracking-wider text-faint">Kap. {o.chapter}</span>
              <button
                type="button"
                onClick={() => hasDetails && setOpen(o.name, !isOpen)}
                aria-expanded={hasDetails ? isOpen : undefined}
                className={`min-w-0 flex-1 text-left ${hasDetails ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <span className={`font-serif text-2xl ${checked ? 'text-muted line-through decoration-faint' : 'text-ink'}`}>{o.name}</span>
                  {o.hourglass && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-gold" title="Timeglass: forsvinner hvis du venter">
                      <Icon name="hourglass" className="size-3.5" /> Timeglass
                    </span>
                  )}
                  {o.missable && <span className="text-xs font-medium text-warn">går tapt</span>}
                  {completionOf(o.name) === 'kreves' && <span className="text-xs font-semibold text-accent">Kreves for 100 %</span>}
                  {completionOf(o.name) === 'teller' && <span className="text-xs font-medium text-ok">Teller for 100 %</span>}
                </div>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                  {o.character && <span className="text-ink-soft">{o.character}. </span>}
                  {o.note}
                </p>
              </button>
              </div>
              {hasDetails && (
                <details
                  className="group/d mb-4 sm:pl-[5.75rem]"
                  open={isOpen}
                  onToggle={(e) => setOpen(o.name, e.currentTarget.open)}
                >
                  <summary className="cursor-pointer list-none text-sm font-medium text-accent hover:underline [&::-webkit-details-marker]:hidden">
                    <span className="group-open/d:hidden">Vis hvordan og hvor</span>
                    <span className="hidden group-open/d:inline">Skjul hvordan og hvor</span>
                  </summary>
                  {o.steps && (
                    <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-ink-soft marker:text-faint">
                      {o.steps.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ol>
                  )}
                  {o.choices && (
                    <div className="mt-4">
                      <ChoiceBox choices={o.choices} />
                    </div>
                  )}
                  {o.stops && (
                    <StopsGuide
                      stops={o.stops}
                      progressKey={`stopp:${o.name}`}
                      done={done}
                      onToggle={(stopKey) => {
                        // Huker du av siste stopp, blir hele oppdraget huket av i samme steg.
                        const stopKeys = o.stops!.map((_, i) => `stopp:${o.name}:${i}`)
                        const allAfter = stopKeys.every((k) => (k === stopKey ? !done.has(k) : done.has(k)))
                        if (allAfter && !checked) onSetMany([stopKey, key], true)
                        else onToggle(stopKey)
                      }}
                    />
                  )}
                  {o.location && !o.stops && (
                    <div className="mt-4">
                      <MapCrop loc={o.location} />
                    </div>
                  )}
                </details>
              )}
            </li>
            )
          })}
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
                      ? 'text-ok'
                      : q.countsForTrophy === false
                        ? 'text-faint'
                        : 'text-gold'
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
                  <Icon name="trophy" className="size-4 text-gold" />
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
