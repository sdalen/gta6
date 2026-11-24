import data from './glitches.json'

/**
 * Pengeglitcher og utnyttelser. Satt sammen fra flere guider og Reddit 24. nov. 2026, rett etter første oppdatering
 * (01.002.002). Rockstar kan fjerne glitcher i nye oppdateringer, så status kan endre seg.
 */
export interface Glitch {
  id: string
  name: string
  status: 'virker' | 'patchet' | 'usikkert'
  patchNote?: string
  platforms?: string
  unlock?: string
  payout?: string
  perHour?: string
  requirements?: string[]
  location: { place: string; area: string; detail: string }
  steps: string[]
  risks?: string[]
  tips?: string[]
  sources?: string[]
  /** Ikke en ekte glitch, men noe som ofte kalles det. */
  myth?: boolean
}

export const glitches = data as Glitch[]

export const statusText: Record<Glitch['status'], string> = {
  virker: 'Virker',
  patchet: 'Fjernet',
  usikkert: 'Usikker',
}

/** Regler som gjelder alle pengetriks. */
export const glitchRules = [
  'Når kapittel 2 starter: Lucia starter kapittel 2 på $0, mens Jason beholder BuckMe-saldoen sin opp til $10 000. Kontanter du bærer og gjemmestedet under gulvet forsvinner. Mer enn $10 000 er bortkastet, så vent til kapittel 2 med å farme.',
  'Før kapittel 4 har BuckMe en grense for saldo. Hold hvert salg under $100 000, ellers kan betalingen låse seg.',
  'Brian og Donnie betaler senere, i postkassen ved huset til Jason. Donnie slutter å kjøpe etter oppdraget Swamped.',
  'Lag en ekstra lagring før du prøver en glitch. Ingen kilder melder om ødelagte lagringer, men det er billig forsikring.',
]
