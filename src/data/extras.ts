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

/** Del av lenken til et valgfritt oppdrag, f.eks. #/valgfritt/bad-driver. */
export const optionalSlug = (name: string) =>
  name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9æøå]+/g, '-').replace(/^-|-$/g, '')

export const optionalMissions: OptionalMission[] = [
  {
    name: "Get Shirley's Rum",
    choices: [
      {
        "question": "Spør du ekspeditøren om fuglelydene?",
        "options": [
          {
            "label": "Spør",
            "result": "Låser opp den illegale operasjonen Exotic Animals Front. Gir Focus og Professional-poeng.",
            "best": true
          },
          {
            "label": "La være",
            "result": "Går glipp av operasjonen."
          }
        ]
      }
    ],
    chapter: '1',
    character: 'Jason',
    note: 'For naboen Shirley. Borte for godt når Tourist Trap starter.',
    missable: true,
    before: 'tourist-trap',
    stops: [
      {
        "title": "Shirley",
        "text": "Naboen til Jason roper på deg utenfor huset etter Unwanted Attention, eller ringer deg.",
        "loc": {
          "x": -2354,
          "y": -5532,
          "z": 5,
          "precision": "landemerke",
          "place": "Jason's House, Key Lento",
          "photo": "L266",
          "photoOf": "Jason's House, Key Lento"
        }
      },
      {
        "title": "Three Sheets Liquor",
        "text": "Sør for huset, fortsatt på Key Lento (lilla flaskeikon). Spør ekspeditøren etter Shirleys rom og ta flasken fra disken. Spør du om fuglelydene, får du også Exotic Animals Front bak butikken.",
        "loc": {
          "x": -2300,
          "y": -5700,
          "z": 4,
          "precision": "område",
          "place": "sør for huset til Jason",
          "note": "butikken er ikke kartlagt, men har eget ikon på kartet i spillet"
        }
      },
      {
        "title": "Tilbake til Shirley",
        "text": "Gi henne flasken.",
        "loc": {
          "x": -2354,
          "y": -5532,
          "z": 5,
          "precision": "landemerke",
          "place": "Jason's House, Key Lento",
          "photo": "L266",
          "photoOf": "Jason's House, Key Lento"
        }
      }
    ],
  },
  {
    name: 'Steal the Scooter',
    chapter: '1',
    character: 'Jason',
    note: 'For naboen Shirley. Borte for godt når Tourist Trap starter.',
    missable: true,
    before: 'tourist-trap',
    stops: [
      {
        "title": "Shirley",
        "text": "Ringer eller snakker med deg en dags tid etter Get Shirley's Rum.",
        "loc": {
          "x": -2354,
          "y": -5532,
          "z": 5,
          "precision": "landemerke",
          "place": "Jason's House, Key Lento",
          "photo": "L266",
          "photoOf": "Jason's House, Key Lento"
        }
      },
      {
        "title": "Huset til Peggy",
        "text": "Bak huset til Shirley, på den andre siden av vannet. Svøm over eller gå rundt langs veien. Scooteren står i oppkjørselen ved trappen. Du kan lure Peggy eller bare ta den.",
        "loc": {
          "x": -2390,
          "y": -5480,
          "z": 5,
          "precision": "område",
          "place": "over vannet bak huset til Shirley",
          "note": "guidene gir bare retningen"
        }
      },
      {
        "title": "Tilbake til Shirley",
        "text": "Kjør hjem. Shirley åpner verandadøren, og du kjører scooteren inn.",
        "loc": {
          "x": -2354,
          "y": -5532,
          "z": 5,
          "precision": "landemerke",
          "place": "Jason's House, Key Lento",
          "photo": "L266",
          "photoOf": "Jason's House, Key Lento"
        }
      }
    ],
  },
  {
    name: 'Clock Out',
    choices: [
      {
        "question": "Svarer du når Lucia ringer?",
        "options": [
          {
            "label": "Svar",
            "result": "Oppdraget dukker opp.",
            "best": true
          },
          {
            "label": "Avvis",
            "result": "Oppdraget er borte."
          }
        ],
        "confidence": "middels"
      }
    ],
    chapter: '1',
    character: 'Jason',
    note: 'Lucia ringer dagen etter Day Release. Du må være på stedet før kl. 16.00, ellers er det borte.',
    missable: true,
    appearsAfter: 'day-release',
    stops: [
      {
        "title": "Key Lento Community Center",
        "text": "Der Lucia jobber. Kom i bil før kl. 16.00. Kommer du til fots, vil hun ikke gå hjem.",
        "loc": {
          "x": -2102,
          "y": -5360,
          "z": 5,
          "precision": "landemerke",
          "place": "Donovan Roeder Jr. Community Center, Key Lento",
          "photo": "L761",
          "photoOf": "Donovan Roeder Jr. Community Center, Key Lento"
        }
      },
      {
        "title": "Hjem til Jason",
        "text": "Kjør henne hjem. Hun går ut av bilen selv.",
        "loc": {
          "x": -2354,
          "y": -5532,
          "z": 5,
          "precision": "landemerke",
          "place": "Jason's House, Key Lento",
          "photo": "L266",
          "photoOf": "Jason's House, Key Lento"
        }
      }
    ],
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
    stops: [
      {
        "title": "Brian",
        "text": "Brian Heder gir deg oppdraget. Ta en båt ved kysten av Key Lento, for det er for langt å svømme.",
        "loc": {
          "x": -2555,
          "y": -5859,
          "z": 5,
          "precision": "landemerke",
          "place": "Brian's Boat Works & Marina, Key Lento",
          "photo": "L326",
          "photoOf": "Brian's Boat Works & Marina, Key Lento"
        }
      },
      {
        "title": "Vraket",
        "text": "I den sørøstlige delen av den rosa søkesirkelen utenfor nordkysten av Key Lento, mot Corsair Key. Bagen ligger i rommet bakerst på båten.",
        "loc": {
          "x": -1668,
          "y": -5320,
          "z": 4,
          "precision": "område",
          "place": "sørøstre del av søkesirkelen",
          "note": "guidene oppgir ikke koordinater, så punktet er anslått"
        }
      },
      {
        "title": "Brian's Lockup",
        "text": "Lever bagen for ca. $1 200. Guidene oppgir ikke hvor lageret ligger."
      }
    ],
  },
  {
    name: 'Thrillbillies',
    chapter: '2',
    note: "Valgfri jobb for Billy. Wyman tipser deg i kafeteriaen på Starlet Motel under Coffee Break. Ingen guide sier at den forsvinner, og Billys historie fortsetter i kapittel 3, men én guide anbefaler å ta den og Twist Wrist, Smash, Grab før Checking Out for sikkerhets skyld.",
    stops: [
      {
        "title": "Suvenirbutikken",
        "text": "Ved inngangen til Thrillbilly Mud Club ved Route 32. Kjøp antrekk til Jason og Lucia. Billy og gjengen venter utenfor.",
        "loc": {
          "x": -4007,
          "y": 4756,
          "z": 5,
          "precision": "landemerke",
          "place": "Thrillbilly Mud Club, Kelly County",
          "photo": "L512",
          "photoOf": "Thrillbilly Mud Club, Kelly County"
        }
      },
      {
        "title": "Roostere's Rentals",
        "text": "Lei en Manchez eller Sanchez inne på området."
      },
      {
        "title": "Løpet",
        "text": "Start ved markøren. 13 førere, men du trenger bare slå én fra gjengen til Billy. Premien avhenger av plasseringen."
      }
    ],
  },
  {
    name: 'Twist Wrist, Smash, Grab',
    chapter: '2',
    note: "Valgfri jobb for Billy. Han sender SMS etter Thrillbillies. Samme som Thrillbillies: ingen guide sier at den forsvinner, men ta den før Checking Out for sikkerhets skyld.",
    stops: [
      {
        "title": "Benken i Port Gellhorn",
        "text": "Sett deg på benken ved markøren, så kommer Billy.",
        "loc": {
          "x": -6400,
          "y": 3400,
          "z": 3,
          "precision": "område",
          "place": "Port Gellhorn",
          "note": "guidene sier ikke hvor benken står"
        }
      },
      {
        "title": "Følg Billy",
        "text": "Kjør etter ham på crossmotorsykkel til du ser pengebilen."
      },
      {
        "title": "Krasjstedet",
        "text": "Pengebilen kjører inn i et tre. Fest ladningen på bakdørene, ta deg av vakten og ta bagen bak bilen."
      },
      {
        "title": "Opp fjellet",
        "text": "Følg Billy opp til gjengen. Oppdraget slutter der. Vil du beholde sykkelen, parker den i en garasje og registrer den hos Moses."
      }
    ],
  },
  {
    name: 'Bilene Moses vil ha',
    chapter: '2',
    appearsAfter: 'daily-driver',
    note: 'Moses ber om sju bestemte biler (Vehicle Drop-Offs). Den første, Crawler-en, er hovedoppdraget Daily Driver. De seks andre kommer etterpå, og du ser dem under Kart → Robberies → Moses Drop-Offs. Ingen guide sier at de forsvinner, men de ligger i og rundt Port Gellhorn, så det er lettest å ta dem i kapittel 2.',
    steps: [
      'Bilene kommer i fast rekkefølge. Lever den du har fått, så kommer neste. Guidene er litt uenige om flere kan være åpne samtidig.',
      'Skann bilen med WAiNK-appen før du stjeler den, så du vet at det er riktig modell. Feil bil blir avvist.',
      'Kjør pent tilbake. Skader trekker fra en bonus på ca. $500, men bilen blir ikke avvist.',
      'Lever alle til garasjen til Moses ved Watkins Auto Parts i Port Gellhorn.',
      'Belønning: ca. 10 minutter etter siste bil sender Moses melding om en gave, en ombygd Sultan (Collect Moses\' Gift).',
    ],
    stops: [
      {
        title: "1. '82 Canis Crawler (Daily Driver)",
        text: 'Hovedoppdrag, spilles som Lucia. Står i det gamle Trader\'s Union-verkstedet i Gellhorn Ave i Port Gellhorn, bak en låst port og under reparasjon. Det henger folk rundt der. Hopp over gjerdet, ta dem du må, og kjør ut. Ca. $1 250.',
      },
      {
        title: '2. Declasse Yosemite 1500',
        text: 'Bastion St, sørvest i Port Gellhorn. En bergingsbil holder på å taue den bort fra en innkjørsel. Er innkjørselen tom, let langs gata etter bergingsbilen. Parker foran den, slå ned sjåføren og trykk på knappen bak på bergingsbilen for å slippe Yosemite-en ned. Kommer du for sent, kjører han, og du må jage ham. Ca. $1 850.',
        loc: { x: -6600, y: 3000, z: 3, precision: 'område', place: 'Bastion St, sørvest i Port Gellhorn', note: 'gatenavnet finnes ikke i kartdataene, så punktet er anslått' },
      },
      {
        title: '3. Karin Futo',
        text: 'Postlageret sør på kaia på Draper Island, bak rulleporten. Det er vakter innenfor gjerdene. Parker før vaktbommene og hopp over gjerdet til venstre, ned på jernbanesporet. Gå til nordvestsiden av bygget og inn kontordøren (de andre dørene er låst). Slå ned eller snik deg forbi arbeideren inne, og åpne rulleporten med knappen ved siden av. Ca. $1 500.',
        loc: { x: -7013, y: 4698, z: 3, precision: 'område', place: 'Draper Island', note: 'postlageret er ikke kartlagt. Det ligger i sørkanten av kaia' },
      },
      {
        title: '4. Annis Hellion',
        text: 'Bungalowen midt i søkeområdet i Orchard Ave, rett sør for Moses. Bilen står i innkjørselen. Det er en hund der, men ingen vakter. Lek med hunden eller hysj på den, så slutter den å bjeffe. Den enkleste bilen. Ca. $1 400.',
        loc: { x: -6450, y: 3170, z: 3, precision: 'område', place: 'Orchard Ave, sør for Watkins Auto Parts', note: 'gatenavnet finnes ikke i kartdataene, så punktet er anslått' },
      },
      {
        title: '5. BF Bandito',
        text: 'Grusveien nordøst i Buckskin-sumpen, sørøst for Port Gellhorn. En gjeng kjører rundt i terrengbiler. Den sølvfargede er målet, skann den med WAiNK så den vises på minikartet. Snakk med eller true sjåføren ut, og hopp inn. Den har bare ett sete, så send partneren bort først. Kompisene hans jager deg og skyter. Ca. $3 350.',
        loc: { x: -4100, y: 1000, z: 2, precision: 'område', place: 'Buckskin, Kelly County', note: 'guidene oppgir bare området, så kjør rundt og se etter gjengen' },
      },
      {
        title: '6. Declasse Vamos',
        text: 'Huset i Rockledge Rd øst for Grayson, Lummox County. Bilen står i garasjen øst for huset. Koden til sidedøren er 2727 (den står på skilt inne i tilhengeren). Døren kan ikke brytes opp. Garasjeporten åpnes med knappen til høyre. Lokale skyter mot tilhengeren og mot deg hvis de ser deg, og de kan prøve å sperre veien tilbake. Ca. $4 200. Safen i huset har samme kode.',
        loc: { x: -3536, y: 7046, z: 2, precision: 'område', place: 'Grayson, Lummox County', note: 'Grayson er ikke kartlagt, så punktet viser bare området' },
      },
      {
        title: '7. Western Nightblade',
        text: 'Klubbhuset til Final Chapter MC i Birch St, Ambrosia. Den oransje motorsykkelen står i underetasjen i den midterste hallen. Den vanskeligste: de skyter med en gang de ser deg, og mange kommer fra plattformen oppe og rommene langs bakveggen. Ta på skuddsikker vest og ha et langt våpen. Kom fra nord og klatre over gjerdet via den grønne containeren, eller ta stigen ved hovedporten opp på taket og hopp ned gjennom den knuste glassruten. Åpne porten før du kjører ut. Ca. $6 300 til $6 500.',
        loc: { x: -2750, y: 4300, z: 3, precision: 'område', place: 'Ambrosia', note: 'klubbhuset er ikke kartlagt, så punktet viser bare Ambrosia' },
      },
      {
        title: 'Gaven: Sultan fra Moses',
        text: 'Vent ca. 10 minutter etter siste levering til Moses sender melding. Sultan-en står i den lille garasjen ved siden av verkstedet hans. Den trengs for 100 %.',
        loc: { x: -6445, y: 3278, z: 4, precision: 'landemerke', place: 'Watkins Auto Parts, Port Gellhorn', photo: 'L348', photoOf: 'Watkins Auto Parts, Port Gellhorn' },
      },
    ],
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
      'Lagre manuelt før møtet med Alvan West. Valget mellom å gå alene eller sammen kan ikke gjøres om (se valget under).',
      'Belønning: ingen dusør. Våpnene og brillene får du bare hvis du går alene.',
      'Viktig i gruven: plukk opp de tre våpnene i gangene før du frigjør partneren. Etterpå starter jakten på Alvan West. Ingen guide bekrefter at du kan gå tilbake og hente dem når han er død og du er ute av gruven, så regn med at det er for sent. Den eneste sikre veien tilbake er en manuell lagring fra før møtet.',
      'Kommer ikke invitasjonen tilbake til lageret? Sjekk at alle tre bildene ligger i Gallery → Creepy Photos, at alle tre likene er meldt, og la det gå litt tid i spillet.',
    ],
    choices: [
      {
        question: 'Etter tredje lik ber Alvan West deg komme tilbake til lageret. Går du alene, eller tar du med partneren?',
        options: [
          {
            label: 'Gå alene',
            result: 'Han doper deg ned og frakter deg til gruven, og du redder deg som den andre. I gangene i gruven ligger tre sjeldne våpen (Island Poacher FF-50, Mahi Nipper .38, Mason & Keen Longshot). Du må plukke dem opp selv, du får dem ikke automatisk. Brillene tar du fra liket hans.',
            best: true,
          },
          {
            label: 'Ta med partneren',
            result: 'Partneren skyter ham med en gang i lageret. Ingen gruve, ingen våpen, og som regel heller ingen briller.',
          },
        ],
        tip: 'Gå inn som Lucia, så er det Jason som utforsker gruven. To guider sier at bare Jason kan plukke opp brillene. Ikke ring noen før du går inn, og lagre manuelt først. Valget kan ikke gjøres om. NB: PowerPyx beskriver oppdraget som lineært, uten dette valget, så det er ikke helt sikkert.',
      },
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
        loc: { x: -6417, y: 3322, z: 5, precision: 'landemerke', place: 'Lageret overfor Watkins Auto Parts (Moses)', note: 'punkt fra GTABase-kartet', photo: 'L348', photoOf: 'Watkins Auto Parts, garasjen til Moses rett over veien' },
      },
      {
        title: 'Lik 1: den rosa bilen på skraphandelen',
        text: 'Rett øst for Pay \'n\' Spray i Port Gellhorn, like sør for drive-in-kinoen. Se etter en knallrosa bil med skiltet PRTYGRL og et annet vrak oppå. Åpne bagasjerommet og meld fra.',
        loc: { x: -6539, y: 3913, z: 5, precision: 'landemerke', place: 'Skraphandelen øst for Pay \'n\' Spray', note: 'punkt fra GTABase-kartet' },
      },
      {
        title: 'Lik 2: tilhengeren under vanntårnet',
        text: 'Nord i Port Gellhorn. Finn det store, rustne vanntårnet og den forlatte campingplassen under det. Gå inn i den lyseblå tilhengeren med åpen dør og undersøk den løse gulvplanken til høyre.',
        loc: { x: -6331, y: 4558, z: 5, precision: 'landemerke', place: 'Campingplassen under vanntårnet, nord i Port Gellhorn', note: 'punkt fra GTABase-kartet. Ikke forveksle med Trailer Park lenger vest' },
      },
      {
        title: 'Lik 3: bilen i sumpen',
        text: 'Rett sørvest for Port Gellhorn, ca. 500 m vest for Moses, på vei mot Wild Hog Point. Finn en liten innsjø med et skadet, skrått tre ved bredden. Den rustne bilen ligger under vann ved roten av treet, bare takstativet stikker opp. Åpne døren. Det er alligatorer her, så dra på dagtid. Flyplassen over vannet er feil sted.',
        loc: { x: -6925, y: 3518, z: 5, precision: 'landemerke', place: 'Den lille innsjøen vest for Moses', note: 'punkt fra GTABase-kartet' },
      },
      {
        title: 'Møtet i lageret',
        text: 'Etter tredje lik ringer Alvan West og ber deg komme tilbake til lageret. Han viser deg til det siste skapet, som har et bilde av Jason og Lucia, og angriper. Kommer du alene, blir du dopet ned og fraktet til gruven, og du spiller videre som den andre.',
        loc: { x: -6417, y: 3322, z: 5, precision: 'landemerke', place: 'Lageret overfor Watkins Auto Parts (Moses)', note: 'samme lager som bildene' },
      },
      {
        title: 'Gruven',
        text: 'Nord i Leonida, øst for Dawson Dam og sør for hyttene ved Lake Tallaloko. Du får markøren på telefonen. Bruk lommelykt og kubein. Let gjennom alle gangene og plukk opp våpnene før du frigjør partneren din, for etterpå starter jakten på Alvan West. Ingen guide sier om du kan gå tilbake og hente dem senere. Slå ham tilbake når han angriper fra mørket, og ta brillene fra liket etterpå.',
        loc: { x: -1997, y: 6691, z: 4, precision: 'landemerke', place: 'Gruven øst for Dawson Dam', note: 'ett innsendt punkt på GTABase-kartet, med bilde som passer. Ikke MacAlister Gold Mine' },
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
    choices: [
      {
        "question": "Rolig eller knuse montrene?",
        "options": [
          {
            "label": "Gå rolig ut",
            "result": "Grunnbetalingen er $20 000 og Snap Gun uansett.",
            "best": true
          },
          {
            "label": "Knus montrene",
            "result": "Mer bytte, men alarmen går."
          }
        ],
        "tip": "Ødelegg overvåkingsopptakene i hver butikk."
      }
    ],
    chapter: '3',
    note: "Tre smykkeran for Yasmani etter Boobie Time. Til sammen ca. $20 000 og Snap Gun.",
    stops: [
      {
        "title": "Yasmani",
        "text": "Han gir deg jobbene. Guidene er uenige om butikken hans ligger i Little Cuba eller Ocean Beach.",
        "loc": {
          "x": -1200,
          "y": 75,
          "z": 3,
          "precision": "område",
          "place": "Little Cuba",
          "note": "usikkert: én guide sier Ocean Beach"
        }
      },
      {
        "title": "Casa de Empeño",
        "text": "Ta denne først. Buffalo Skull Chain (ca. $6 300) ligger i safen på det lille bakkontoret. Kode 1680. Lever med en gang, så får du Snap Gun.",
        "loc": {
          "x": 1786,
          "y": 1001,
          "z": 5,
          "precision": "landemerke",
          "place": "Casa de Empeño"
        }
      },
      {
        "title": "Richardson Jewelry & Diamonds",
        "text": "Diamantring (minst $9 000). Bakdør som åpnes med Snap Gun. Safen står i nordøstre hjørne av rommet i midten. Kode 6815.",
        "loc": {
          "x": -681,
          "y": -118,
          "z": 5,
          "precision": "landemerke",
          "place": "Richardson Jewelry & Diamonds"
        }
      },
      {
        "title": "Donovan Banks & Co.",
        "text": "Ametysthalskjede (ca. $4 700). Bakdør med Snap Gun. Safen står midt i den lange gangen bak. Kode 0104.",
        "loc": {
          "x": -1220,
          "y": -1742,
          "z": 5,
          "precision": "landemerke",
          "place": "Donovan Banks & Co."
        }
      },
      {
        "title": "Tilbake til Yasmani",
        "text": "Selg smykkene hos ham.",
        "loc": {
          "x": -1200,
          "y": 75,
          "z": 3,
          "precision": "område",
          "place": "Little Cuba"
        }
      }
    ],
  },
  {
    name: 'Dubious Provenance',
    chapter: '3',
    note: 'Gi statuen til Halifax før kapittel 3 er over, ellers mister du del 3 og byttet.',
    missable: true,
    before: 'the-cartel-heist',
    stops: [
      {
        "title": "Leiligheten i Bayside",
        "text": "Del 1. Bagen med statuen ligger i skapet.",
        "loc": {
          "x": -400,
          "y": 1000,
          "z": 4,
          "precision": "område",
          "place": "Bayside, Vice City"
        }
      },
      {
        "title": "Evelyn Andrews Antiques",
        "text": "Antikvitetsbutikken i Capri, helt vest på kartet. Halifax vurderer statuen. Gir du den, får du Crowex Octane «Bobby Ambrose»-klokken.",
        "loc": {
          "x": -6500,
          "y": -150,
          "z": 4,
          "precision": "område",
          "place": "Capri",
          "note": "butikken er ikke kartlagt"
        }
      },
      {
        "title": "Sweet Bay Inn",
        "text": "Del 2. Bryt deg inn i antikvitetsbutikken bakfra (trapp, lavt tak, vinduet over aircondition-anlegget) og sjekk skuffen i nordre hjørne. Halifax er i rom 111 oppe på vestsiden av motellet rett ved siden av.",
        "loc": {
          "x": -6500,
          "y": -150,
          "z": 4,
          "precision": "område",
          "place": "Capri"
        }
      },
      {
        "title": "Huset til Maryam",
        "text": "Del 3. Snakk med Evelyn i butikken, og dra så til huset nordvest i Capri. Halifax flykter med båt (Jason følger på Seashark), til fots og i golfbil.",
        "loc": {
          "x": -6700,
          "y": 150,
          "z": 4,
          "precision": "område",
          "place": "nordvestre Capri"
        }
      },
      {
        "title": "Containeren",
        "text": "Ca. $2 500 og en '32 Hustler. Du velger om Halifax skal leve."
      }
    ],
  },
  {
    name: 'Bad Driver!',
    choices: [
      {
        "question": "Dreper eller sparer du Felipe?",
        "options": [
          {
            "label": "Spar ham",
            "result": "Han tar kontakt senere og starter Collect Felipe's Gift: bilen hans. Ingen guide navngir modellen.",
            "best": true
          },
          {
            "label": "Drep ham",
            "result": "Andrea betaler $20 000."
          }
        ],
        "tip": "Vil du ha bilen, spar ham. Vil du ha pengene, drep ham. Lagre før."
      }
    ],
    chapter: '4',
    note: 'Dukker opp etter Party Hard. Borte for godt når Power Play starter. Spar Felipe for å få bilen hans.',
    missable: true,
    before: 'power-play',
    appearsAfter: 'party-hard',
    stops: [
      {
        "title": "Baren i Millport",
        "text": "Andrea sier Felipe er sett i Millport, Lummox County. Gå bakerst i baren. Felipe kommer ut fra toalettet.",
        "loc": {
          "x": -1059,
          "y": 6490,
          "z": 5,
          "precision": "landemerke",
          "place": "Jacob's Tavern Bar, Millport (trolig)",
          "note": "guidene navngir ikke baren, men dette er baren i Millport i kartdataene",
          "photo": "L3398",
          "photoOf": "Jacob's Tavern Bar, Millport (trolig)"
        }
      },
      {
        "title": "Jakten",
        "text": "Han løper ut bakdøren mot skogen. Skyt ham i beina eller slå ham til han gir seg."
      },
      {
        "title": "Valget",
        "text": "Avhør ham. Sparer du ham, får du Collect Felipe's Gift: en bil han har lagt igjen til deg."
      }
    ],
  },
  {
    name: 'This Is a Free Call From...',
    choices: [
      {
        "question": "Shayna trekker pistol mot Raph",
        "options": [
          {
            "label": "Snakk henne ned",
            "result": "Anbefalt.",
            "best": true
          },
          {
            "label": "Be henne skyte",
            "result": "Ingen fordel nevnt."
          }
        ],
        "confidence": "middels"
      },
      {
        "question": "Gjengen dukker opp",
        "options": [
          {
            "label": "Snakk dem ned",
            "result": "De forlater ca. $1 200 i dop. Shayna deler bagen med deg (ca. $5 000), og du kan plyndre huset for ca. $1 500.",
            "best": true
          },
          {
            "label": "Skyt alle tre",
            "result": "Skuddveksling."
          }
        ],
        "tip": "Opptil ca. $6 500 totalt.",
        "confidence": "middels"
      }
    ],
    chapter: '4',
    character: 'Lucia',
    note: 'Hent Shayna. Bytt til Lucia og ta oppdraget med en gang timeglasset dukker opp.',
    missable: true,
    hourglass: true,
    stops: [
      {
        "title": "Fengselet i Hamlet",
        "text": "Shayna sender melding mens Lucia kjører i nærheten av Hamlet. Hent henne ved fengselet.",
        "loc": {
          "x": -2683,
          "y": -2930,
          "z": 5,
          "precision": "landemerke",
          "place": "Main Gate, Prison, Hamlet",
          "note": "guidene oppgir ikke nøyaktig hentested",
          "photo": "L1129",
          "photoOf": "Main Gate, Prison, Hamlet"
        }
      },
      {
        "title": "Huset til Raph",
        "text": "Kjør henne til kjæresten i Southside.",
        "loc": {
          "x": -1750,
          "y": -1950,
          "z": 4,
          "precision": "område",
          "place": "Southside, Vice City",
          "note": "huset er ikke kartlagt"
        }
      }
    ],
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
