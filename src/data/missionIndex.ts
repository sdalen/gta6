import { chapters } from './chapters'

/** Løpenummer for første oppdrag i hvert kapittel, så nummereringen går gjennom hele spillet. */
export const startIndexes = chapters.map((_, i) =>
  chapters.slice(0, i).reduce((n, c) => n + c.missions.length, 1),
)
