/**
 * Lager kartdata for samleobjektene.
 *
 * Kobler hver ting til et sted i GTADB sine landemerkedata (CC BY 4.0) ved å lete etter
 * stedsnavn i navnet og beskrivelsen, og kopierer kartflisene som trengs til public/kart/.
 * Guidene har ingen eksakte koordinater, så posisjonen er alltid omtrentlig:
 * et navngitt landemerke, et område (snitt av landemerkene der) eller et fylke.
 *
 * Bruk: node scripts/build-map-crops.mts <sti til klone av github.com/rolux/gtadb.org>
 */
import { execFileSync } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { collectibles, itemId } from '../src/data/collectibles.ts'
import details from '../src/data/collectibleDetails.json' with { type: 'json' }
import glitches from '../src/data/glitches.json' with { type: 'json' }
import cars from '../src/data/cars.json' with { type: 'json' }

const repo = process.argv[2]
if (!repo) throw new Error('Mangler sti til gtadb.org-klonen')

const TILESET = 'day'
const MAP_W = 32768
const ZERO = 16384
const VIEW_W = 768 // største utsnitt i appen (css-px)
const VIEW_H = 340
const MIN_Z = 0 // samme som MIN_Z/MAX_Z i src/components/MapCrop.tsx
const MAX_Z = 6
const FULL_Z = 4 // hele kartet til og med dette nivået

type Landmark = [string, [number, number], ...unknown[]]
const landmarks = JSON.parse(readFileSync(join(repo, 'map/data/6/landmarks.json'), 'utf8')) as Record<string, Landmark>

// Generiske ord som ikke sier noe om hvor noe er.
const generic = new Set(
  `bridge lake river pier park canal tunnel lock fence tank church marina lighthouse warehouse prison runway beacon
  cabin blimp water tower train bridge construction site parking lot gas station car wash tennis court bus stop
  footbridge interchange grandstands airfield train station radio tower cell tower radio mast water tank underwater ruins
  boat ramp prison building route 1 bridge shoreline downtown southside crosstown lake leonida pool garage motel
  trailer house island beach dock gym office store bar diner hotel mall`
    .split(/\s*\n\s*|\s{2,}/)
    .flatMap((l) => [l.trim()])
    .filter(Boolean),
)
for (const w of ['bridge', 'lake', 'river', 'pier', 'park', 'canal', 'tunnel', 'lock', 'tank', 'church', 'marina', 'lighthouse',
  'warehouse', 'prison', 'runway', 'beacon', 'cabin', 'blimp', 'water tower', 'train bridge', 'construction site', 'parking lot',
  'gas station', 'car wash', 'tennis court', 'bus stop', 'footbridge', 'interchange', 'grandstands', 'airfield', 'train station',
  'radio tower', 'cell tower', 'radio mast', 'water tank', 'underwater ruins', 'boat ramp', 'prison building', 'shoreline',
  'downtown', 'southside', 'crosstown', 'pool', 'garage', 'motel', 'trailer', 'island', 'beach', 'dock', 'gym', 'office',
  'store', 'bar', 'diner', 'hotel', 'mall', 'bridge', 'leonida', 'fence', 'route 1', 'port', 'city', 'county', 'bay', 'keys', 'north', 'south', 'east', 'west'])
  generic.add(w)

// Stedsnavn -> alle koordinater der navnet forekommer.
const places = new Map<string, { name: string; pts: [number, number][]; ids: string[]; isLandmarkName: boolean }>()
for (const [id, [label, xy]] of Object.entries(landmarks)) {
  if (!Array.isArray(xy) || xy.length !== 2 || !xy.every(Number.isFinite)) continue
  const parts = label.split(',').map((p) => p.trim().replace(/^"|"$/g, ''))
  parts.forEach((p, i) => {
    if (!p || p.includes('?') || p.length < 4 || generic.has(p.toLowerCase())) return
    const key = p.toLowerCase()
    const e = places.get(key) ?? { name: p, pts: [], ids: [], isLandmarkName: false }
    e.pts.push(xy)
    if (i === 0) e.ids.push(id)
    if (i === 0) e.isLandmarkName = true
    places.set(key, e)
  })
}

const centroid = (pts: [number, number][]) => {
  const x = pts.reduce((s, p) => s + p[0], 0) / pts.length
  const y = pts.reduce((s, p) => s + p[1], 0) / pts.length
  const spread = Math.sqrt(pts.reduce((s, p) => s + (p[0] - x) ** 2 + (p[1] - y) ** 2, 0) / pts.length)
  return { x, y, spread }
}

const aliases: [string, string][] = [
  ['huset til jason', "jason's house"],
  ['stylteboligen til jason', "jason's house"],
  ['brygga til jason', "jason's house"],
  ['bak huset til jason', "jason's house"],
]

export interface MapLocation {
  x: number
  y: number
  z: number
  precision: 'landemerke' | 'område' | 'region'
  place: string
  photo?: string
  photoOf?: string
}

const dist = (a: [number, number], b: { x: number; y: number }) => Math.hypot(a[0] - b.x, a[1] - b.y)
const photoIds = new Set(
  execFileSync('git', ['-C', repo, 'ls-tree', '-r', '--name-only', 'HEAD', 'map/photos/6'], { encoding: 'utf8', maxBuffer: 1 << 26 })
    .split('\n')
    .filter((p) => p.endsWith(',ig.jpg'))
    .map((p) => p.slice('map/photos/6/'.length, -',ig.jpg'.length)),
)
const photos = new Set<string>()

const out: Record<string, MapLocation> = {}
const tiles = new Set<string>()
const misses: string[] = []

function place(key: string, text0: string, landmark?: string, area?: string, at?: [number, number], label = '') {
  let text = text0.toLowerCase()
  for (const [no, en] of aliases) text = text.replaceAll(no, en)
  type Hit = { name: string; x: number; y: number; spread: number; ids: string[] }
  let best: Hit | null = at ? { name: label, x: at[0], y: at[1], spread: 0, ids: [] } : null
  const consider = (p: { name: string; pts: [number, number][]; ids: string[] }) => {
    const c = centroid(p.pts)
    if (!best || c.spread < best.spread || (c.spread === best.spread && p.name.length > best.name.length)) best = { name: p.name, ...c, ids: p.ids }
  }
  // 1) Landemerket fra den detaljerte beskrivelsen, hvis det finnes som navngitt landemerke.
  if (!best && landmark) {
    for (const part of [landmark, ...landmark.split(/,| \(|\)/)]) {
      const p = places.get(part.trim().toLowerCase())
      if (p?.isLandmarkName && centroid(p.pts).spread < 150) consider(p)
    }
  }
  // 2) Ellers: let etter stedsnavn i teksten.
  if (!best) {
    if (landmark) text += ` ${landmark.toLowerCase()}`
    if (area) text += ` ${area.toLowerCase()}`
    for (const [k, p] of places) {
      if (!text.includes(k)) continue
      // Hele ord, ikke deler av ord.
      if (!new RegExp(`(^|[^a-zæøå])${k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}($|[^a-zæøå])`).test(text)) continue
      consider(p)
    }
  }
  const hit = best as Hit | null
  if (!hit) {
    misses.push(`${key} ${label}`)
    return
  }
  const precision = hit.spread < 150 ? 'landemerke' : hit.spread < 900 ? 'område' : 'region'
  const z = precision === 'landemerke' ? 5 : precision === 'område' ? 3 : 2
  const loc: MapLocation = { x: Math.round(hit.x), y: Math.round(hit.y), z, precision, place: hit.name }
  // Spillbilde av landemerket: det nærmeste med bilde.
  if (precision === 'landemerke') {
    const withPhoto = hit.ids.filter((id) => photoIds.has(id))
    if (withPhoto.length) {
      const nearest = withPhoto.sort((a, b) => dist(landmarks[a][1], hit) - dist(landmarks[b][1], hit))[0]
      loc.photo = nearest
      loc.photoOf = hit.name
      photos.add(nearest)
    }
  }
  out[key] = loc
  // Fliser som dekker utsnittet på alle zoomnivåer brukeren kan velge.
  // Nivå 6 bare der punktet er presist, ellers blir det for mange fliser.
  for (let zz = MIN_Z; zz <= (precision === 'landemerke' ? MAX_Z : MAX_Z - 1); zz++) {
    const size = 1024 * 2 ** zz
    const px = ((hit.x + ZERO) * size) / MAP_W
    const py = ((ZERO - hit.y) * size) / MAP_W
    for (let ty = Math.floor((py - VIEW_H / 2) / 256); ty <= Math.floor((py + VIEW_H / 2) / 256); ty++)
      for (let tx = Math.floor((px - VIEW_W / 2) / 256); tx <= Math.floor((px + VIEW_W / 2) / 256); tx++)
        tiles.add(`${zz}/${zz},${ty},${tx}.jpg`)
  }
}

for (const cat of collectibles) {
  cat.items.forEach((item, idx) => {
    // I disse kategoriene er navnet et sted. Ellers (kort, blader osv.) er navnet bare et produktnavn.
    const nameIsPlace = ['stunts', 'meteoritter', 'meditasjon', 'waink', 'flamingoer', 'basket', 'skytebane'].includes(cat.id)
    const key = itemId(cat.id, idx)
    const d = (details as Record<string, { landmark?: string; area?: string }>)[key]
    place(key, nameIsPlace ? `${item.name} ${item.where}` : item.where, d?.landmark ?? undefined, d?.area ?? undefined, item.at, item.name)
  })
}

// Pengeglitcher og biler.
for (const g of glitches as { id: string; name: string; location: { place: string; area: string; detail: string } }[])
  place(`glitch:${g.id}`, `${g.location.detail} ${g.location.area}`, g.location.place, g.location.area, undefined, g.name)
for (const c of cars.cars as { id: string; name: string; location: { place: string; area: string; detail: string } }[])
  place(`bil:${c.id}`, `${c.location.detail} ${c.location.area}`, c.location.place, c.location.area, undefined, c.name)

/** Henter filer fra den blobless klonen. Hopper over det som alt er hentet og prøver igjen ved nettverksfeil. */
function checkout(paths: string[]) {
  const todo = paths.filter((p) => !existsSync(join(repo, p)))
  for (let i = 0; i < todo.length; i += 100) {
    const batch = todo.slice(i, i + 100)
    for (let attempt = 1; ; attempt++) {
      try {
        execFileSync('git', ['-C', repo, 'checkout', 'HEAD', '--', ...batch], { stdio: 'ignore', timeout: 300_000 })
        break
      } catch (e) {
        if (attempt >= 4) throw e
      }
    }
    console.log(`Hentet ${Math.min(i + 100, todo.length)}/${todo.length}`)
  }
}

// Hent flisene fra git (klonen er blobless) og kopier dem inn i appen.
const existing = new Set(
  execFileSync('git', ['-C', repo, 'ls-tree', '-r', '--name-only', 'HEAD', `maps/tiles/6/${TILESET}`], { encoding: 'utf8', maxBuffer: 1 << 26 })
    .split('\n')
    .filter(Boolean),
)
// Hele kartet på de laveste zoomnivåene, så det kan dras og zoomes fritt.
for (const p of existing) {
  const z = Number(p.split('/')[4])
  if (z <= FULL_Z) tiles.add(p.slice(`maps/tiles/6/${TILESET}/`.length))
}
const wanted = [...tiles].map((t) => `maps/tiles/6/${TILESET}/${t}`).filter((p) => existing.has(p))
checkout(wanted)
const dest = 'public/kart'
rmSync(dest, { recursive: true, force: true })
for (const p of wanted) {
  const target = join(dest, p.slice(`maps/tiles/6/${TILESET}/`.length))
  mkdirSync(dirname(target), { recursive: true })
  if (existsSync(join(repo, p))) copyFileSync(join(repo, p), target)
}

// Spillbilder av landemerkene, skalert ned til 960 px bredde.
const photoPaths = [...photos].map((id) => `map/photos/6/${id},ig.jpg`)
checkout(photoPaths)
rmSync('public/foto', { recursive: true, force: true })
mkdirSync('public/foto', { recursive: true })
for (const id of photos) {
  execFileSync('sips', ['-Z', '960', '-s', 'format', 'jpeg', '-s', 'formatOptions', '70', join(repo, `map/photos/6/${id},ig.jpg`), '--out', `public/foto/${id}.jpg`], { stdio: 'ignore' })
}

writeFileSync('src/data/mapLocations.json', JSON.stringify(out, null, 0) + '\n')
const counts = Object.values(out).reduce<Record<string, number>>((a, l) => ((a[l.precision] = (a[l.precision] ?? 0) + 1), a), {})
console.log(`Plassert: ${Object.keys(out).length}`, counts, `Fliser: ${wanted.length}/${tiles.size}`, `Bilder: ${photos.size}`)
console.log(`Uten sted (${misses.length}):\n  ${misses.join('\n  ')}`)
