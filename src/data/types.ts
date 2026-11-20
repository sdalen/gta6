export type Character = 'Lucia' | 'Jason' | 'Begge'

export interface Mission {
  id: string
  name: string
  /** Oppgaveteksten som vises i spillet, hvis den er en annen enn navnet */
  task?: string
  character?: Character
  summary: string
  steps?: string[]
  tip?: string
  warning?: string
  tag?: string
}

export interface Chapter {
  id: string
  number: string
  title: string
  titleNo: string
  intro: string
  missions: Mission[]
}

export interface OptionalMission {
  name: string
  chapter: string
  character?: Character
  note: string
  missable?: boolean
  /** Oppdrag (id) som gjør det for sent. */
  before?: string
  /** Hovedoppdrag (id) som låser opp dette. */
  appearsAfter?: string
  /** Timeglass-ikon i spillet: forsvinner hvis du venter for lenge. */
  hourglass?: boolean
}

export interface Questline {
  giver: string
  countsForTrophy: boolean | null
  note?: string
}

export interface Tip {
  title: string
  body: string
  category: 'Viktig' | 'Penger' | 'Progresjon' | 'Trofeer'
}
