import { chapters } from './chapters'
import type { Mission } from './types'

/** Løpenummer for første oppdrag i hvert kapittel, så nummereringen går gjennom hele spillet. */
export const startIndexes = chapters.map((_, i) =>
  chapters.slice(0, i).reduce((n, c) => n + c.missions.length, 1),
)

const matches = (text: string | undefined, q: string) => !!text && text.toLowerCase().includes(q)

/** Om et hovedoppdrag passer søket (q må være trimmet og med små bokstaver). */
export function missionMatches(m: Mission, q: string, spoilers: boolean) {
  return (
    matches(m.name, q) ||
    matches(m.task, q) ||
    matches(m.character, q) ||
    (spoilers && (matches(m.summary, q) || !!m.steps?.some((s) => matches(s, q)))) ||
    matches(m.tip, q)
  )
}
