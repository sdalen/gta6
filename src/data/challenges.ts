/**
 * Challenges (Progress → Challenges). Satt sammen fra PowerPyx, games.gg og GamerFuzion (18.–19. nov. 2026).
 * Alle er tilgjengelige fra starten av spillet. Ingen er låst til eller forsvinner etter et oppdrag.
 * Navn står på engelsk slik de heter i spillet. Spillet bruker miles og feet.
 */
import type { IconName } from '../components/Icon'

export interface Challenge {
  name: string
  goal: string
  tip?: string
  /** Lang eller vanskelig. Foreslått å hoppe over (du trenger bare 70 av 80). */
  skip?: boolean
}

export interface ChallengeCategory {
  id: string
  name: string
  icon: IconName
  /** Belønning for 5 og 10 fullførte, ifølge GamerFuzion. */
  reward5: string
  reward10: string
  items: Challenge[]
}

const c = (name: string, goal: string, tip?: string, skip?: boolean): Challenge => ({ name, goal, tip, skip })

export const challengeCategories: ChallengeCategory[] = [
  {
    id: 'kamp',
    name: 'Kamp',
    icon: 'crosshair',
    reward5: 'Speeder 700 GT',
    reward10: 'Bravado Banshee',
    items: [
      c('Speed Kills', 'Drep 3 fiender på under 30 sekunder.', 'Kommer ofte av seg selv i oppdrag med mange fiender.'),
      c('Melee Combat', 'Drep eller slå ut 5 fiender på rad med nærkampvåpen uten å dø.'),
      c('Explosive Combat', 'Drep eller skad 3 fiender med ett enkelt eksplosiv.', 'Kast en granat mot en gruppe som står samlet.'),
      c('Headshots', 'Drep 4 fiender med hodeskudd i løpet av én bruk av Combat Focus.'),
      c('Drive-Bys', 'Drep 5 fiender fra et kjøretøy på under 1 minutt uten å gå ut.'),
      c('Stealth Sniping', 'Drep 7 fiender som ikke har oppdaget deg, med snikskytterrifle med kikkert, uten å dø eller bli arrestert.', 'Gjør det fra avstand før du går inn i et gjengtilholdssted.'),
      c('Incendiary', 'Drep eller skad 5 fiender med brann på under 15 sekunder.', 'Molotovcocktail mot en gruppe.'),
      c('Revolver Headshots', 'Drep 6 fiender med hodeskudd med revolver, uten å lade om eller bytte våpen.'),
      c('Long-Range Sniping', 'Drep 3 fiender på under 10 sekunder med snikskytterrifle med kikkert, fra minst 300 feet.'),
      c('High Explosive', 'Drep eller skad 8 fiender med eksplosiver på under 20 sekunder uten å ta skade.'),
    ],
  },
  {
    id: 'kriminelt',
    name: 'Kriminelt',
    icon: 'lock',
    reward5: 'Maibatsu Sanchez',
    reward10: 'Western Zombie Bobber',
    items: [
      c('Mugging', 'Ran 5 fotgjengere.'),
      c('Stick Ups', 'Ran 3 butikker på én dag uten å dø eller bli arrestert.'),
      c('Carjacking', "Stjel 3 kjøretøy og kjør dem til en Pay 'n' Spray på én dag, uten å dø eller bli arrestert."),
      c('Mugging Spree', 'Stjel $500 i kontanter fra fotgjengere på én dag uten å dø eller bli arrestert.'),
      c('Cop Car Theft', 'Vær etterlyst i 5 minutter mens du sitter i en stjålet politibil.'),
      c('Cop Weapon Theft', 'Ta et våpen fra bagasjerommet på 5 ulike politibiler uten å dø eller bli arrestert.'),
      c('Stick Up Spree', 'Ran 2 butikker i hvert av de 5 fylkene på under 20 minutter, uten å dø eller bli arrestert.', 'Planlegg ruten og velg butikker nær fylkesgrensene. Bruk en rask bil.'),
      c('Cop Tow', 'Slep en politibil med folk i 1 mile uten å stoppe.'),
      c('Carjacking Spree', "Registrer eller lakker stjålne biler fra 10 ulike produsenter hos Pay 'n' Spray på under 30 minutter, uten å dø eller bli arrestert."),
      c('Carjacking Pro', "Tjen $100 000 på å selge stjålne kjøretøy til kjøpere eller Pay 'n' Spray på én dag, uten å dø eller bli arrestert.", 'Superbiler til Randy gir mest per bil.'),
    ],
  },
  {
    id: 'utforskning',
    name: 'Utforskning',
    icon: 'compass',
    reward5: 'Nagasaki Sea Sparrow',
    reward10: 'Nagasaki Carbon RS',
    items: [
      c('WAiNK Locations', 'Skann 4 landemerker, kuriositeter eller skulpturer med WAiNK.', 'Se WAiNK-listen under Samle.'),
      c('Skyscrapers', 'Kom deg til toppen av de 5 høyeste skyskraperne i Vice-Dale County.'),
      c('Collectible Cards', 'Finn 3 samlekort i hvert av de 5 fylkene.', 'Se samlekortene under Samle.'),
      c('Encyclopedia', 'Oppdag 100 dyr, kjøretøy og våpen.'),
      c('Underwater Discoveries', 'Finn og utforsk 25 uvanlige ting på havbunnen.'),
      c('Rail Tour', 'Reis 1 mile med tog i hvert av de 5 fylkene på én dag, uten å hoppe over turen.'),
      c('Underwater Treasures', 'Finn 85 skatter under vann.', 'Henger sammen med dykkingen for Kenton.'),
      c('Black Hole Wrecks', 'Finn alle 11 Black Hole-vrakene.'),
      c('Road Trip', 'Kjør til alle byer og tettsteder i Leonida på én dag. Du kan bare gå ut av bilen for å fylle drivstoff.', undefined, true),
      c('Helipad Flyovers', 'Fly over alle 41 helikopterplassene i Vice City og Vice Beach, på 100 feet eller lavere, på under 10 minutter.', undefined, true),
    ],
  },
  {
    id: 'form',
    name: 'Form',
    icon: 'zap',
    reward5: 'Tuff BMX',
    reward10: "'65 Vapid Dominator",
    items: [
      c('Gym Member', 'Bli medlem på et treningssenter.'),
      c('Foot Travel', 'Gå eller løp 5 miles på én dag.'),
      c('Pro Cyclist', 'Sykle 15 miles på én dag.'),
      c('Pro Swimmer', 'Svøm 3 miles på én dag.'),
      c('Balanced Workout', 'Tren på alle typer treningsapparater på én dag.'),
      c('Strength Regime', 'Hold styrkenivå 4 med både Jason og Lucia samtidig i 5 dager på rad.', 'Start tidlig og tren begge jevnlig.'),
      c('Cardio Regime', 'Hold kondisjonsnivå 4 med både Jason og Lucia samtidig i 5 dager på rad.', 'Start tidlig og tren begge jevnlig.'),
      c('Waning Sands Run', 'Løp fra porten til brygga The Tip til Waning Sands på under 13 minutter, uten å ta skade.'),
      c('Tequesta Swim', 'Svøm fra Tequesta Retreat til Starfish Island på under 15 minutter.'),
      c('Southwind Cycle', "Sykle fra Williams Guest House i Grayson til Chicky's Tiki Bar i Southwind på under 22 minutter, uten å falle av."),
    ],
  },
  {
    id: 'shopping',
    name: 'Shopping',
    icon: 'coins',
    reward5: 'Maibatsu Boomazoom',
    reward10: 'Truffade Thrax',
    items: [
      c('Vehicle Modder', 'Gjør 5 endringer på kjøretøyet ditt hos et verksted.'),
      c('Grocery Shopper', 'Bruk over $250 i dagligvare- eller vinbutikker på én dag.'),
      c('Well Armed', 'Kjøp 3 håndvåpen og 3 langvåpen hos Ammu-Nation.'),
      c('Well Groomed', 'Bruk over $1 000 hos barberer, frisører eller salonger.'),
      c('Stylishly Armed', 'Kjøp kosmetiske oppgraderinger til 5 håndvåpen og 5 langvåpen hos Ammu-Nation.'),
      c('Well Dressed', 'Bruk over $5 000 på klær.'),
      c('Custom Ride', 'Bruk over $20 000 på ett besøk hos et verksted.'),
      c('Heavily Armed', 'Bruk over $50 000 hos Ammu-Nation.'),
      c('Serious Modder', 'Bruk over $125 000 hos verksteder.'),
      c('Nest Egg', 'Ha $1 500 000 på BuckMe-brukskontoen.', 'Realistisk først sent i spillet eller etter historien. Se Pengestrategi.', true),
    ],
  },
  {
    id: 'sport',
    name: 'Sport',
    icon: 'ball',
    reward5: 'Vapid Stanier G2 Taxi',
    reward10: 'Brimstone Golfer',
    items: [
      c('Basketball Rookie', 'Treff kurven på 3 ulike baner på én dag.', 'Se basketkurvene under Samle.'),
      c('Golf Rookie', 'Spill 18 hull på King Gator eller Frontier Adventure Golf på under 30 minutter, på 3 under par eller bedre.'),
      c('Basketball Streak', 'Treff 10 skudd på rad på under 2 minutter.'),
      c('Pool Streak', 'Vinn biljard på 3 ulike steder på én dag uten å tape eller gi opp.'),
      c('Basketball Tour', 'Treff kurven i hvert fylke.'),
      c('Golf Pro', 'Spill 18 hull på både King Gator og Frontier Adventure Golf på én dag, på par eller bedre.'),
      c('Triple Bank', 'Spill køballen i 3 vant før du senker en ball.'),
      c('Basketball Pro', 'Treff kurven på alle 100 banene i Leonida.', '100 % krever uansett 90 kurver, så denne kan komme nesten gratis.', true),
      c('8-Ball Break', 'Vinn et biljardparti ved å senke 8-ballen på åpningsstøtet.'),
      c('Double Hole In One', 'Få hole in one to ganger på rad i samme runde på King Gator eller Frontier Adventure Golf.', undefined, true),
    ],
  },
  {
    id: 'overlevelse',
    name: 'Overlevelse',
    icon: 'leaf',
    reward5: 'Airboat 09',
    reward10: 'Hauners Rhino Tank',
    items: [
      c('Alligator Kills', 'Drep 3 ville alligatorer.'),
      c('Big Fish', 'Få en fisk på 20 pounds eller mer.'),
      c('Marksman', 'Ta medalje på begge skytebanene på én dag.', 'Griffin Shooting Range og Rodgers Ranch. Se Skytebaner under Samle.'),
      c('Catch of the Day', 'Få 3 fisk med hver type sluk på én dag.'),
      c('Zoologist', 'Studer 20 ulike dyrearter.'),
      c('Angler', 'Få 4 ulike fiskearter på under 6 minutter.'),
      c('Pro Marksman', 'Ta gull i Master-utfordringen i 3 ulike skytebaneøvelser på rad, uten å feile eller gi opp.'),
      c('Hunting Spree', 'Drep en villsvin, en klapperslange og en panter på under 15 minutter, uten å ta skade fra fiender eller dyr.'),
      c('Pro Angler', 'Få alle fiskeartene.', undefined, true),
      c('Legendary Hunter', 'Drep alle 8 unike dyr.', "Henger sammen med Bret's Hunting Decks. Sjekk dem før du hopper over denne.", true),
    ],
  },
  {
    id: 'kjoretoy',
    name: 'Kjøretøy',
    icon: 'car',
    reward5: 'Lapwing Mallard',
    reward10: 'Progen Emerus',
    items: [
      c('Vehicle Discovery', 'Undersøk eller oppdag 6 ulike kjøretøy.'),
      c('Wheelie', 'Kjør på bakhjulet i 0,25 miles.'),
      c('Winning Streak', 'Vinn 3 løp: ett med muskelbil, ett med sportsbil og ett med superbil.'),
      c('Throttled', 'Hold over 100 mph i et motorkjøretøy i 2 minutter.', 'Én guide sier 2 miles i stedet for 2 minutter. Sjekk teksten i spillet. Bruk en lang, rett motorvei.'),
      c('Drawbridge Jump', 'Hopp over en vindebro mer enn 100 feet, 3 ganger, uten å gå ut av kjøretøyet.'),
      c('Top Speed', 'Kom opp i 175 mph i bil, lastebil eller motorsykkel.'),
      c('Train Landing', 'Land et fly på et tog i fart uten å ødelegge flyet.', 'Krever presis kontroll. Sett av tid til mange forsøk.', true),
      c('Oceanarium Jump', 'Hopp ut av et fly fra minst 0,5 miles og land med fallskjerm i spekkhogger- eller delfinbassenget på Vice City Oceanarium, uten å dø.', undefined, true),
      c('Rally Winner', 'Vinn 3 løp på rad på én dag: Thrillbilly Mud Club, Gellhorn International Raceway og Boone Speedway. Ikke gi opp eller start på nytt.'),
      c('Train Jump', 'Hopp minst 75 feet med motorsykkel og land på et tog i fart, to ganger på 20 minutter.', undefined, true),
    ],
  },
]

export const challengeId = (catId: string, idx: number) => `utfordring:${catId}:${idx}`

/** Løpsutfordringer (Map → Activities → Racing). 10 gull trengs for 100 %. Kilde: games.gg. */
export interface RaceChallenge {
  name: string
  where: string
  gold: string
  silver: string
  bronze: string
  note?: string
}

export const raceChallenges: RaceChallenge[] = [
  { name: 'Ambrosia Raceway Trial', where: 'Øst i North Kelly County, nær Lake Leonida', gold: '0:15', silver: '0:20', bronze: '0:35' },
  { name: 'Hamlet BMX Stunt Run', where: 'Nord i Hamlet, nordøst for Boone Speedway', gold: '3 000 poeng', silver: '2 000 poeng', bronze: '1 000 poeng', note: 'Poeng for triks på BMX.' },
  { name: 'Boone Speedway Trial', where: 'Sørvest i Hamlet', gold: '0:21', silver: '0:32', bronze: '0:55', note: 'Du kan leie bil for $400 hvis du kommer uten.' },
  { name: 'Gellhorn Raceway Trial', where: 'Gellhorn Raceway, sørøst i South Kelly County', gold: '3:15', silver: '3:45', bronze: '4:15', note: 'Kjør introrunden med Beau (under 1:00) først for å låse opp løpene her.' },
  { name: 'Gellhorn Dragway Trial', where: 'Gellhorn Raceway, sørøst i South Kelly County', gold: '0:11', silver: '0:15', bronze: '0:20', note: 'Krever også introrunden med Beau.' },
  { name: 'Kalaga Cycling Trial', where: 'Toppen av Mount Kalaga National Park, Lummox County. Mål ved foten av fjellet.', gold: '1:05', silver: '1:15', bronze: '1:25' },
  { name: 'Mud Club Air Time Stunt Run', where: 'Thrillbilly Mud Club, Frogswater', gold: '1 600 poeng', silver: '800 poeng', bronze: '400 poeng', note: 'Vær lengst mulig i luften.' },
  { name: 'Mud Club Drag Trial', where: 'Thrillbilly Mud Club, Frogswater', gold: '0:08', silver: '0:10', bronze: '0:12' },
  { name: 'Mud Club Hill Climb Trial', where: 'Thrillbilly Mud Club, Frogswater', gold: '0:20', silver: '0:30', bronze: '1:00' },
  { name: 'Mud Club Dirt Track Trial', where: 'Thrillbilly Mud Club, Frogswater', gold: '2:45', silver: '3:15', bronze: '4:00' },
  { name: 'Mud Club Oval Trial', where: 'Thrillbilly Mud Club, Frogswater', gold: '0:20', silver: '0:25', bronze: '0:30' },
  { name: 'Mud Club Swamp Run Trial', where: 'Thrillbilly Mud Club, Frogswater', gold: '0:32', silver: '0:45', bronze: '1:00' },
  { name: 'Waning Sands Motocross Stunt Run', where: 'Nord i Waning Sands, nær Richard Barebone State Park', gold: '3 000 poeng', silver: '2 000 poeng', bronze: '1 000 poeng', note: 'Gjør triks mens du kjører gjennom sjekkpunktene.' },
]

export const raceId = (idx: number) => `lop:${idx}`
