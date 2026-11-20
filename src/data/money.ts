export interface MoneyPhase {
  phase: string
  chapters: string
  headline: string
  methods: {
    name: string
    payout: string
    unlock: string
    how: string[]
  }[]
  rules: string[]
}

/**
 * Pengestrategi kapittel for kapittel. Beløpene er anslag fra flere guider
 * publisert rett etter lansering og kan endre seg med oppdateringer.
 */
export const moneyPlan: MoneyPhase[] = [
  {
    phase: 'Tidlig',
    chapters: 'Kapittel 1–2',
    headline: 'Bygg opp en buffer, sett inn alt i banken og ikke mist noe.',
    methods: [
      {
        name: 'Ran av dagligvarebutikker',
        payout: 'Lite',
        unlock: 'Fra start',
        how: [
          'Sikt på kassereren for å skremme hen. Lav etterlysning.',
          'Bakrommet har ofte en safe. Koden står noen ganger på en lapp i nærheten, ellers kan du presse den ut av noen.',
          'Noen butikker har skjulte rom med gjengaktivitet. Mer penger, men også mer risiko.',
        ],
      },
      {
        name: 'Selg biler til Moses',
        payout: 'ca. $1 000–5 000 per bil',
        unlock: 'Kapittel 2 (oppdraget «Moses»)',
        how: [
          'Han kjøper bare biler uten sporingssender.',
          'Det er pause mellom salgene (ca. 3–4 biler per dag). Sov i et safehouse for å nullstille den.',
          'Kjør forsiktig. Skader trekker ned prisen.',
        ],
      },
      {
        name: 'Hovedoppdrag og sideoppdrag',
        payout: 'Varierer, ofte store beløp',
        unlock: 'Hele spillet',
        how: ['Den sikreste inntekten tidlig i spillet. Sett inn utbetalingen med en gang.'],
      },
    ],
    rules: [
      'Opprett bankkonto i «Buck Me» og sett inn pengene når du er i nærheten. Nå sparemålet på $5 000 før Tourist Trap. Det gir $15 000 på brukskontoen, som du trenger før Checking Out.',
      'Family Savings: pengene blir låst og kan ikke brukes, men sparemålene hever grensen på brukskontoen. $5 000 gir $15 000, $10 000 gir $100 000, $100 000 gir $500 000 og $500 000 gir $2 000 000.',
      'Før Checking Out: minst $15 000 i banken, og lagre manuelt.',
      'Ikke farm penger i kapittel 1. Flere guider melder at kontanter ikke blir med videre.',
      'Arrestasjon eller død = du mister kontantene du har på deg. Fra kapittel 2 er banken trygg.',
    ],
  },
  {
    phase: 'Midtveis',
    chapters: 'Kapittel 3',
    headline: 'Vice City åpner for de virkelig lønnsomme sidejobbene.',
    methods: [
      {
        name: 'Superbiler til Randy',
        payout: 'ca. $30 000–35 000+ i perfekt stand',
        unlock: "Kapittel 3 («Clonin' Keys, Makin' GS»)",
        how: [
          'Følg Randy\'s Wish List. Den gir også troféet «Supply & Demand».',
          'Prisen avhenger av skadene. Ta motorveien, ikke snarveiene.',
        ],
      },
      {
        name: 'Smykkebutikker og pantelånere',
        payout: 'ca. $10 000–25 000 per butikk',
        unlock: "Kapittel 3 (Yasmani's Jewelry Jobs)",
        how: [
          'Rekognoser først. Inngangen er ofte bakfra.',
          'Slå av alarmen og ødelegg overvåkingsopptakene, så kommer politiet senere.',
          'Høyere etterlysning enn butikkran. Planlegg fluktruten på forhånd.',
        ],
      },
      {
        name: 'Gjengtilholdssteder og dop',
        payout: 'Lite (cannabis) til mye (krystall/kokain)',
        unlock: 'Når du kan selge dop',
        how: [
          'Gult ikon på kartet viser et tilholdssted.',
          'Byttet må fraktes til en kjøper. Senere kan du levere i en garasje, men da tar kjøperen en større andel.',
          'Gå etter krystall og kokain. Cannabis lønner seg knapt.',
        ],
      },
    ],
    rules: [
      'Bytt mellom Randy-biler og smykkeran mens du venter på at nye hovedoppdrag skal dukke opp.',
      'Lagre før The Cartel Heist og sett inn alle kontanter.',
    ],
  },
  {
    phase: 'Sent',
    chapters: 'Kapittel 4–5',
    headline: 'Bankhvelv: størst utbetaling og størst risiko.',
    methods: [
      {
        name: 'Bankran',
        payout: 'Opptil ca. $205 000 per hvelv',
        unlock: "Mot slutten av kapittel 4 («That's Where The Money Is...», gir fargepatron-jammer)",
        how: [
          'Tre nivåer: kassaskuffer, safer med merkede sedler og hvelv. Hvelvet gir mest.',
          'Svært høy etterlysning når du går ut. Ha en fluktbil klar og en rute du har testet.',
          'Ha full rustning og mye ammunisjon. Lagre før hvert ran.',
        ],
      },
    ],
    rules: [
      'Fullfør alle VCIA-forberedelsene før VCIA Takedown og sett inn alt først.',
      'Ha penger på bok til honoraret til Abe Gonzalez.',
      'Etter historien er alt fortsatt åpent i fri modus. Da kan du farme bankran og Randy-biler uten å risikere historiepengene.',
    ],
  },
]

export const kingOfTheHill = [
  'Bank først, så ran: hver krone du har på deg kan du miste.',
  'Lagre før hvert stort ran. Det er ingen omspilling av oppdrag.',
  'Kapittel 2: Moses-biler hver dag, og sov for å nullstille pausen.',
  'Kapittel 3: Randy-biler er ofte bedre enn smykkeran. Mindre risiko og høyere snitt.',
  'Kapittel 4+: bankhvelv er det beste. Planlegg fluktruten før du går inn.',
  'Sen kveld og natt: sov for å hoppe frem i tid til nye oppdrag og nullstille pauser.',
]
