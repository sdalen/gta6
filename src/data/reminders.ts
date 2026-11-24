import { chapters } from './chapters'
import { collectibles, itemId } from './collectibles'
import { optionalMissions } from './extras'
import type { Mission, OptionalMission } from './types'
import { href } from '../hooks/useRoute'

/** Ting som blir utilgjengelige når et bestemt hovedoppdrag starter. */
export interface Reminder {
  key: string
  label: string
  kind: string
  /** Forklaring eller sted, vist under navnet. */
  detail?: string
  to?: string
  /** Nøkkel i fremdriften, så tingen kan hukes av. */
  doneKey: string
}

const missionInfo = new Map<string, { mission: Mission; chapter: string; order: number }>()
const storyOrder: string[] = []
for (const c of chapters)
  for (const m of c.missions) {
    missionInfo.set(m.id, { mission: m, chapter: c.number, order: storyOrder.length })
    storyOrder.push(m.id)
  }

const byMission = new Map<string, Reminder[]>()
const add = (missionId: string, r: Reminder) => byMission.set(missionId, [...(byMission.get(missionId) ?? []), r])

// Forberedelser som ikke er samleobjekter: kort tittel og forklaring på hva og hvorfor.
const prep: Record<string, { label: string; detail: string }[]> = {
  'tourist-trap': [
    {
      label: 'Spar $5 000 i Family Savings',
      detail:
        'Anbefalt. Sett inn penger på sparekontoen Family Savings i bankappen til du når målet på $5 000. Da kan du ha opptil $15 000 på brukskontoen.',
    },
    {
      label: 'Kjør rundt på Key Lento',
      detail:
        'Kapittel 1 foregår på Key Lento. Ta de tilfeldige hendelsene du kommer over der (personer som trenger hjelp, småjobber). Noen kan være borte etter Tourist Trap.',
    },
    {
      label: 'Lag en ekstra lagring i spillet',
      detail:
        'Lagre manuelt i en ny lagringsplass, ikke over autolagringen. Da kan du laste den senere og ta noe du gikk glipp av før Tourist Trap.',
    },
  ],
  'checking-out': [
    {
      label: 'Selg stjålne ting til Dunk',
      detail: 'Dunk kjøper tyvegods. Selg det du har før Checking Out, ellers kan du bli sittende med det.',
    },
    {
      label: 'Ha minst $15 000 i banken og lagre',
      detail: 'Motellet slutter å være hjemmet ditt etter Checking Out. Sett inn pengene og lagre manuelt i en ny lagringsplass.',
    },
  ],
  'the-cartel-heist': [
    { label: 'Selg stjålne ting', detail: 'Noen av kjøperne av tyvegods forsvinner for godt etter dette oppdraget.' },
    { label: 'Sett inn alle kontanter og lagre', detail: 'Kontanter du har på deg kan du miste. Sett alt i banken og lagre manuelt i en ny lagringsplass.' },
  ],
  'vcia-takedown': [
    { label: 'Fullfør sidejobber med timeglass', detail: 'Jobber med timeglass-ikon på kartet forsvinner hvis du venter. Ta dem før VCIA Takedown.' },
    { label: 'Lag en ekstra lagring i spillet', detail: 'Lagre manuelt i en ny lagringsplass, så du kan gå tilbake hvis noe går galt.' },
  ],
  'the-end-of-the-road': [
    {
      label: 'Lagre før siste oppdrag',
      detail: 'Spillet har flere slutter og ingen omspilling av oppdrag. Lagre i en ny lagringsplass, så kan du se de andre sluttene.',
    },
  ],
}
for (const [mission, lines] of Object.entries(prep))
  lines.forEach(({ label, detail }, i) =>
    add(mission, { key: `husk:${mission}:${i}`, label, detail, kind: 'Forberedelse', doneKey: `husk:${mission}:${i}` }),
  )

// Ting du får inne i selve oppdraget. Vises for seg, ikke som noe du må gjøre før du starter.
const duringByMission = new Map<string, Reminder[]>()

for (const cat of collectibles) {
  cat.items.forEach((item, idx) => {
    const key = itemId(cat.id, idx)
    const r = { key, label: item.name, detail: item.where, kind: cat.name, to: href('samle', cat.id, String(idx)), doneKey: key }
    if (item.before) add(item.before, r)
    if (item.during) duringByMission.set(item.during, [...(duringByMission.get(item.during) ?? []), r])
  })
}

export function duringFor(missionId: string): Reminder[] {
  return duringByMission.get(missionId) ?? []
}
for (const o of optionalMissions) {
  if (!o.before) continue
  const key = `valgfritt:${o.name}`
  add(o.before, { key, label: o.name, detail: o.note, kind: 'Valgfritt oppdrag', to: href('valgfritt'), doneKey: key })
}

export function remindersFor(missionId: string): Reminder[] {
  return byMission.get(missionId) ?? []
}

/** Valgfrie oppdrag som dukker opp etter dette hovedoppdraget. */
export function unlockedBy(missionId: string): OptionalMission[] {
  return optionalMissions.filter((o) => o.appearsAfter === missionId)
}

/** Neste hovedoppdrag (ikke fullført) som låser noe du ikke har gjort, med det som gjenstår. */
export function nextDeadline(done: Set<string>) {
  const candidates = [...byMission.keys()]
    .map((id) => ({ id, info: missionInfo.get(id)! }))
    .filter(({ id, info }) => info && !done.has(id))
    .sort((a, b) => a.info.order - b.info.order)
  for (const { id, info } of candidates) {
    const all = remindersFor(id)
    const open = all.filter((r) => !done.has(r.doneKey))
    if (!open.length) continue
    // Hovedoppdrag du ikke har fullført før fristoppdraget.
    const missionsBefore = storyOrder.slice(0, info.order).filter((m) => !done.has(m)).length
    return { mission: info.mission, chapter: info.chapter, all, open, total: all.length, missionsBefore }
  }
  return null
}
