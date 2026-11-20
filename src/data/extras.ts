import type { OptionalMission, Questline, Tip } from './types'

export const tips: Tip[] = [
  {
    category: 'Viktig',
    title: 'Ingen omspilling av oppdrag',
    body: 'Du kan ikke spille oppdrag på nytt, og det finnes ingen gullmedaljer. Lagre manuelt i starten og slutten av hvert kapittel.',
  },
  {
    category: 'Viktig',
    title: 'Timeglass = haster',
    body: 'Oppdrag med timeglass-ikon er tidsbegrensede og forsvinner hvis du venter for lenge. Ta dem med en gang.',
  },
  {
    category: 'Progresjon',
    title: 'Finn neste oppdrag',
    body: 'Det rosa bok-ikonet på kartet viser hovedoppdragene du har igjen.',
  },
  {
    category: 'Progresjon',
    title: 'Ingen nye oppdrag?',
    body: 'Gjør sideaktiviteter eller sov for å la tiden gå. Nye oppdrag dukker opp etter hvert.',
  },
  {
    category: 'Progresjon',
    title: 'Bytt karakter',
    body: 'Noen hovedoppdrag dukker bare opp for Jason eller Lucia. Ser du ingenting, bytt til den andre.',
  },
  {
    category: 'Progresjon',
    title: 'Story Recap er upålitelig',
    body: 'Oversikten under Progress viser ikke alltid fullførte hovedoppdrag, og valgfrie oppdrag vises aldri. Bruk sjekklisten i denne guiden i stedet.',
  },
  {
    category: 'Penger',
    title: 'Sett inn kontanter',
    body: 'Kontanter du har på deg kan du miste. Sett inn pengene i banken før farlige oppdrag.',
  },
  {
    category: 'Penger',
    title: 'Før Tourist Trap (kap. 1)',
    body: 'Sett inn minst $5 000 i Family Savings. Huset til Jason og kontantene du har på deg forsvinner.',
  },
  {
    category: 'Penger',
    title: 'Før Checking Out (kap. 2)',
    body: 'Ha minst $15 000 i banken og lagre manuelt. Motellet slutter å være hjemmet ditt.',
  },
  {
    category: 'Penger',
    title: 'Større bankran',
    body: 'Oppdraget «That\'s Where The Money Is...» i kapittel 4 åpner for ran av større bankhvelv.',
  },
  {
    category: 'Trofeer',
    title: 'Meditasjon på balkongen',
    body: 'Etter Down to Earth: snakk med Lucia hjemme hos Jason om morgenen og takk ja til meditasjon. Kan trengs for et trofé og er bare mulig i kapittel 1.',
  },
  {
    category: 'Trofeer',
    title: 'Strangers & Freaks',
    body: 'Troféet krever 8 historier, men bare noen av dem teller. Se oversikten under «Valgfrie oppdrag».',
  },
]

export const optionalMissions: OptionalMission[] = [
  {
    name: "Get Shirley's Rum",
    chapter: '1',
    note: 'Kan bare tas i kapittel 1.',
    missable: true,
  },
  {
    name: 'Steal the Scooter',
    chapter: '1',
    note: 'Kan bare tas i kapittel 1.',
    missable: true,
  },
  {
    name: 'Thrillbillies',
    chapter: '2',
    note: 'Valgfri jobb for Billy.',
  },
  {
    name: 'Twist Wrist, Smash, Grab',
    chapter: '2',
    note: 'Valgfri jobb for Billy.',
  },
  {
    name: 'Race Against Yago',
    chapter: '3',
    note: 'Tidsbegrenset. Ta det med en gang det dukker opp.',
    missable: true,
  },
  {
    name: "Yasmani's Jewelry Jobs",
    chapter: '3',
    note: 'Smykkejobber for Yasmani.',
  },
  {
    name: 'This Is a Free Call From...',
    chapter: '4',
    character: 'Lucia',
    note: 'Tidsbegrenset: hent Shayna. Svar på anropet med en gang.',
    missable: true,
  },
]

export const questlines: Questline[] = [
  { giver: 'Kirk', countsForTrophy: true },
  { giver: 'Kyle', countsForTrophy: true },
  { giver: 'Yago', countsForTrophy: true },
  { giver: 'Pilot Pete', countsForTrophy: true },
  { giver: 'Bret Vogel', countsForTrophy: null, note: 'Bret\'s Hunting Decks gir troféet «Fair Game»' },
  { giver: 'Randy', countsForTrophy: null, note: 'Randy\'s Wish List gir troféet «Supply & Demand»' },
  { giver: 'Dunk', countsForTrophy: null },
  { giver: 'Shirley', countsForTrophy: false },
  { giver: 'Cal', countsForTrophy: false },
  { giver: 'Moses', countsForTrophy: false },
  { giver: 'Billy', countsForTrophy: false },
  { giver: 'Andy', countsForTrophy: false },
  { giver: 'Yasmani', countsForTrophy: false },
  { giver: 'Tyrone', countsForTrophy: false },
  { giver: 'Eddie Acosta', countsForTrophy: false },
]

export const questlineTrophies = [
  { questline: "Bret's Hunting Decks", trophy: 'Fair Game' },
  { questline: 'Hometown Heroes', trophy: 'The Lone Rider' },
  { questline: 'Puff Puff Pass', trophy: 'Road to Rehabilitation' },
  { questline: "Randy's Wish List", trophy: 'Supply & Demand' },
  { questline: 'Spin On This', trophy: 'Spin On This!' },
]
