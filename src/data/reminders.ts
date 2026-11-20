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

// Forberedelser som ikke er samleobjekter.
const prep: Record<string, string[]> = {
  'tourist-trap': [
    'Sett inn minst $5 000 i Family Savings. Kontantene du har på deg forsvinner.',
    'Utforsk Key Lento og ta tilfeldige hendelser der.',
    'Lagre manuelt i en egen lagringsplass.',
  ],
  'checking-out': [
    'Selg stjålne ting til Dunk.',
    'Ha minst $15 000 i banken og lagre manuelt. Motellet slutter å være hjemmet ditt.',
  ],
  'the-cartel-heist': ['Selg stjålne ting. Noen kjøpere forsvinner for godt.', 'Sett inn alle kontanter og lagre manuelt.'],
  'vcia-takedown': ['Fullfør sidejobber med timeglass.', 'Lagre i en ny lagringsplass.'],
  'the-end-of-the-road': ['Lagre før siste oppdrag. Spillet har flere slutter og ingen omspilling.'],
}
for (const [mission, lines] of Object.entries(prep))
  lines.forEach((label, i) => add(mission, { key: `husk:${mission}:${i}`, label, kind: 'Forberedelse', doneKey: `husk:${mission}:${i}` }))

for (const cat of collectibles) {
  cat.items.forEach((item, idx) => {
    if (!item.before) return
    const key = itemId(cat.id, idx)
    add(item.before, { key, label: item.name, kind: cat.name, to: href('samle', cat.id, String(idx)), doneKey: key })
  })
}
for (const o of optionalMissions) {
  if (!o.before) continue
  const key = `valgfritt:${o.name}`
  add(o.before, { key, label: o.name, kind: 'Valgfritt oppdrag', to: href('valgfritt'), doneKey: key })
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
    return { mission: info.mission, chapter: info.chapter, open, total: all.length, missionsBefore }
  }
  return null
}
