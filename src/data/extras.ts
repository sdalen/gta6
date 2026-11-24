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
    body: 'Sett gjerne inn $5 000 i Family Savings. Det er det første sparemålet og hever grensen på brukskontoen til $15 000. Pengene blir låst, så ikke sett inn mer enn du trenger for målet.',
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
    character: 'Jason',
    note: 'For naboen Shirley. Borte for godt når Tourist Trap starter.',
    missable: true,
    before: 'tourist-trap',
  },
  {
    name: 'Steal the Scooter',
    chapter: '1',
    character: 'Jason',
    note: 'For naboen Shirley. Borte for godt når Tourist Trap starter.',
    missable: true,
    before: 'tourist-trap',
  },
  {
    name: 'Clock Out',
    chapter: '1',
    character: 'Jason',
    note: 'Lucia ringer dagen etter Day Release. Du må være på stedet før kl. 16.00, ellers er det borte.',
    missable: true,
    appearsAfter: 'day-release',
  },
  {
    name: "Donnie's Lost Drugs",
    chapter: '1',
    character: 'Jason',
    note: 'Brian vil ha tilbake dopet fra båten Donnie senket utenfor Corsair Key. Gir ca. $1 200 og trengs for 100 %. Guidene sier ikke om det forsvinner etter kapittel 1, men ta det før Tourist Trap for sikkerhets skyld.',
    appearsAfter: 'swamped',
    before: 'tourist-trap',
    steps: [
      'Dukker opp av seg selv etter Swamped. Ser du det ikke, sjekk listen over valgfrie oppdrag på kartet.',
      'Ta en båt. Det er for langt å svømme. Har du dykkerutstyr (fra båten til Kenton), ta det med.',
      'Kjør til den rosa søkesirkelen i havet utenfor nordkysten av Key Lento, mot Corsair Key.',
      'Dykk i den sørøstlige delen av sirkelen (markert på kartet under). Den sunkne båten ligger på bunnen.',
      'Åpne rommet bakerst på båten og ta bagen. Harpunen holder haiene unna.',
      'Lever bagen hos Brian (Brian\'s Lockup) for ca. $1 200.',
    ],
    location: {
      x: -1668,
      y: -5320,
      z: 4,
      precision: 'landemerke',
      place: 'sørøstre del av søkesirkelen, mellom Key Lento og Corsair Key',
      note: 'guidene oppgir ikke koordinater, så punktet er anslått ut fra beskrivelsen',
    },
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
    name: 'Savnede personer (seriemorderen)',
    chapter: '2',
    note: 'Skjult oppdrag som aldri vises på kartet. Det starter med plakatene i resepsjonen på Starlet Motel, og ifølge én guide kommer du ikke inn der etter Checking Out. Start det i kapittel 2, når både Jason og Lucia er spillbare.',
    missable: true,
    before: 'checking-out',
    steps: [
      'Ta stoppene under i rekkefølge. Trykk på et stopp for å se det på kartet.',
      'Fotografer alle tre skapene før du leter etter likene.',
      'Meld fra om hvert lik (trekant/Y) og vent til samtalen med tipstelefonen er ferdig. Uten melding går ikke oppdraget videre.',
      'Lagre manuelt før møtet med Alvan West. Valget mellom å gå alene eller sammen kan ikke gjøres om.',
      'Belønning: ingen dusør. Går du alene, får du tre sjeldne våpen i gruven (Island Poacher FF-50, Mahi Nipper .38 og Mason & Keen Longshot) og brillene hans. Går dere sammen, blir han skutt med en gang, og du går glipp av gruven, våpnene og trolig brillene.',
      'Kommer ikke invitasjonen tilbake til lageret? Sjekk at alle tre bildene ligger i Gallery → Creepy Photos, at alle tre likene er meldt, og la det gå litt tid i spillet.',
    ],
    stops: [
      {
        title: 'Plakatene på Starlet Motel',
        text: 'Gå inn i resepsjonen og hold L2/LT på en av plakatene om savnede personer ved pulten til Linda. Kelly County Tip Line havner i kontaktene dine.',
        loc: { x: -5355, y: 3462, z: 5, precision: 'landemerke', place: 'Starlet Motel', photo: 'L304', photoOf: 'Starlet Motel' },
      },
      {
        title: 'Lageret overfor Moses',
        text: 'Langt, nedslitt bygg med buet blikktak rett over veien for garasjen til Moses i Port Gellhorn. Rulleporten går ikke opp. Gå inn gjennom en liten åpning i veggen på høyre side, delvis skjult av planter (trekant/Y). Følg gangen gjennom det røde rommet og plastforhengene, og fotografer de tre bildene i skapene.',
      },
      {
        title: 'Lik 1: den rosa bilen på skraphandelen',
        text: 'Øst for Pay \'n\' Spray og vest for Delights. Se etter en knallrosa bil med skiltet PRTYGRL og et annet vrak oppå. Åpne bagasjerommet og meld fra.',
        loc: { x: -6410, y: 3440, z: 5, precision: 'område', place: 'mellom Pay \'n\' Spray og Delights', note: 'skraphandelen er ikke kartlagt, så punktet er anslått mellom de to landemerkene' },
      },
      {
        title: 'Lik 2: tilhengeren under vanntårnet',
        text: 'Nord i Port Gellhorn. Finn det store, rustne vanntårnet og den forlatte campingplassen under det. Gå inn i den lyseblå tilhengeren med åpen dør og undersøk den løse gulvplanken til høyre.',
        loc: { x: -6781, y: 3959, z: 5, precision: 'landemerke', place: 'Trailer Park, Port Gellhorn', photo: 'L1062', photoOf: 'Trailer Park, Port Gellhorn' },
      },
      {
        title: 'Lik 3: bilen i sumpen',
        text: 'Vest for Port Gellhorn mot Wild Hog Point, i sumpen vest for Moses. Finn en liten innsjø med et skadet, skrått tre ved bredden. Den rustne bilen ligger halvveis under vann ved roten av treet. Åpne døren. Det er alligatorer her, så dra på dagtid. Flyplassen over vannet er feil sted.',
        loc: { x: -7250, y: 3350, z: 4, precision: 'område', place: 'sumpen mot Wild Hog Point', note: 'guidene oppgir bare retningen, så let rundt punktet' },
      },
      {
        title: 'Møtet i lageret',
        text: 'Etter tredje lik ringer Alvan West og ber deg komme tilbake til lageret. Han viser deg til det siste skapet, som har et bilde av Jason og Lucia, og angriper. Kommer du alene, blir du dopet ned og fraktet til gruven, og du spiller videre som den andre.',
      },
      {
        title: 'Gruven',
        text: 'Nord i Leonida ved Dawson Dam og Mount Kalaga. Du får markøren på telefonen. Bruk lommelykt og kubein, finn kammeret med Focus og frigjør partneren din. Slå ham tilbake når han angriper fra mørket, og ta brillene fra liket etterpå.',
        loc: { x: -4115, y: 6943, z: 4, precision: 'område', place: 'MacAlister Gold Mine (trolig)', note: 'guidene navngir ikke gruven. Dette er nærmeste gruve i kartdataene' },
      },
    ],
  },
  {
    name: 'Race Against Yago',
    chapter: '3',
    character: 'Jason',
    note: 'Dukker opp etter Bumper to Bumper. Forsvinner hvis du venter for lenge. Kan stenge resten av oppdragene til Yago.',
    missable: true,
    hourglass: true,
  },
  {
    name: "Yasmani's Jewelry Jobs",
    chapter: '3',
    note: 'Smykkejobber for Yasmani.',
  },
  {
    name: 'Dubious Provenance',
    chapter: '3',
    note: 'Gi statuen til Halifax før kapittel 3 er over, ellers mister du del 3 og byttet.',
    missable: true,
    before: 'the-cartel-heist',
  },
  {
    name: 'Bad Driver!',
    chapter: '4',
    note: 'Dukker opp etter Party Hard. Borte for godt når Power Play starter. Spar Felipe for å få bilen hans.',
    missable: true,
    before: 'power-play',
    appearsAfter: 'party-hard',
  },
  {
    name: 'This Is a Free Call From...',
    chapter: '4',
    character: 'Lucia',
    note: 'Hent Shayna. Bytt til Lucia og ta oppdraget med en gang timeglasset dukker opp.',
    missable: true,
    hourglass: true,
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
