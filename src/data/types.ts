import type { MapLocation } from './mapLocations'

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
  /** Slik gjør du det, steg for steg. */
  steps?: string[]
  /** Hvor oppdraget foregår, vist som kart. */
  location?: MapLocation
  /** Flere steder i rekkefølge, vist som nummererte punkter på ett kart med bilde. */
  stops?: Stop[]
}

export interface Stop {
  /** Kort navn, f.eks. «Lik 1: skraphandelen». */
  title: string
  /** Hvordan du finner akkurat dette stedet. */
  text: string
  /** Mangler når ingen kilde har et sted som kan plasseres på kartet. */
  loc?: MapLocation
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
