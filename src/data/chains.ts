import { chapters } from './chapters'

/**
 * Hovedoppdrag som går rett over i hverandre uten fri roaming imellom.
 * Du får ikke lagret, samlet ting eller gjort sideaktiviteter mellom dem,
 * så alt som må gjøres «før» et av de senere oppdragene, må gjøres før det første.
 * Kilder: PowerPyx (feltene «starts immediately after»), VGC, readdork og GTABase (nov. 2026).
 */
export interface MissionChain {
  /** Oppdrags-id-er i rekkefølge. Oppdrag som ikke finnes i appen, står som navn. */
  missions: string[]
  /** Låser kapittelet: mye blir utilgjengelig for godt eller i lang tid. */
  lockIn?: boolean
  /** Hva du går glipp av, eller hva som er usikkert. */
  note: string
  confidence: 'høy' | 'middels'
}

export const missionChains: MissionChain[] = [
  {
    missions: ['recalibration', 'tourist-trap', 'home-sweet-home', 'discharge-time', 'whats-in-the-bag'],
    lockIn: true,
    note:
      'Kapittel 1 låses. Tourist Trap, Home Sweet Home og Discharge Time går helt sikkert i ett, og du våkner på motellet i What\'s in the Bag?. Guidene er uenige om kjeden starter allerede ved Recalibration, så gjør alt du skal i kapittel 1 før du starter Recalibration. Du mister huset til Jason, ærendene for Shirley og bilene fra Ultimate Edition, og du får ikke spille som Jason på flere timer.',
    confidence: 'høy',
  },
  {
    missions: ['clear-skies', 'Building a Life'],
    note: 'Building a Life (glassplaten til bordet) starter med en gang Clear Skies er ferdig. Det er kort, så du mister bare noen minutter.',
    confidence: 'høy',
  },
  {
    missions: ['swamped', 'don-gone'],
    note: 'Don Gone og Donnie\'s Lost Drugs starter med en gang etter Swamped. Husk at Donnie slutter å kjøpe tyvegods etter Swamped.',
    confidence: 'middels',
  },
  {
    missions: ['breakfast-run', 'coffee-break'],
    note: 'Coffee Break starter rett etter Breakfast Run. Etterpå kommer fire jobber på kartet som du tar i fri roaming, så du mister lite.',
    confidence: 'middels',
  },
  {
    missions: ['checking-out', 'welcome-to-vice-city'],
    lockIn: true,
    note:
      'Kapittel 2 låses. Du kjører rett inn i Vice City etter Checking Out, og Starlet Motel er ikke lenger hjemmet ditt. Samlekortene på motellrommet og kjøperne i Port Gellhorn må tas før.',
    confidence: 'høy',
  },
  {
    missions: ['sinfrontera-national-bank', 'security-expert'],
    note: 'Security Expert starter automatisk når Sinfrontera National Bank er ferdig.',
    confidence: 'middels',
  },
  {
    missions: ['ocean-beach', 'another-life'],
    note: 'Another Life starter med en gang du bytter til Lucia etter Ocean Beach.',
    confidence: 'middels',
  },
  {
    missions: ['sunset', 'starting-from-zero', 'bird-in-the-hand', 'taking-liberties'],
    lockIn: true,
    note:
      'Kapittel 4 låses. Sunset starter når du henter lappen i resepsjonen på Y Hotel, og deretter går det rett gjennom til og med Taking Liberties. Én guide sier at du må spille det meste av kapittel 5 før du får fri roaming igjen. Gjør alt sideinnhold i kapittel 4 før du henter lappen.',
    confidence: 'middels',
  },
  {
    missions: ['protective-custody', 'the-end-of-the-road'],
    lockIn: true,
    note: 'De to siste oppdragene spilles i ett. Du kan velge «Postpone» før Protective Custody. Etter rulleteksten får du fri roaming igjen.',
    confidence: 'middels',
  },
]

const chainOf = new Map<string, { chain: MissionChain; pos: number }>()
for (const chain of missionChains) chain.missions.forEach((id, pos) => chainOf.set(id, { chain, pos }))

export function chainFor(missionId: string) {
  return chainOf.get(missionId) ?? null
}

const names = new Map(chapters.flatMap((c) => c.missions.map((m) => [m.id, m.name] as const)))

/** Navnet på et oppdrag i en kjede (id-er slås opp, andre står som de er). */
export const chainName = (id: string) => names.get(id) ?? id
