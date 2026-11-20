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

const repo = process.argv[2]
if (!repo) throw new Error('Mangler sti til gtadb.org-klonen')

const TILESET = 'day'
const MAP_W = 32768
const ZERO = 16384
const VIEW_W = 768 // største utsnitt i appen (css-px)
const VIEW_H = 288
const MIN_Z = 0 // samme som MIN_Z/MAX_Z i src/components/MapCrop.tsx
const MAX_Z = 5
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
const places = new Map<string, { name: string; pts: [number, number][]; isLandmarkName: boolean }>()
for (const [label, xy] of Object.values(landmarks)) {
  if (!Array.isArray(xy) || xy.length !== 2 || !xy.every(Number.isFinite)) continue
  const parts = label.split(',').map((p) => p.trim().replace(/^"|"$/g, ''))
  parts.forEach((p, i) => {
    if (!p || p.includes('?') || p.length < 4 || generic.has(p.toLowerCase())) return
    const key = p.toLowerCase()
    const e = places.get(key) ?? { name: p, pts: [], isLandmarkName: false }
    e.pts.push(xy)
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
}

const out: Record<string, MapLocation> = {}
const tiles = new Set<string>()
const misses: string[] = []

for (const cat of collectibles) {
  cat.items.forEach((item, idx) => {
    // I disse kategoriene er navnet et sted. Ellers (kort, blader osv.) er navnet bare et produktnavn.
    const nameIsPlace = ['stunts', 'meteoritter', 'meditasjon', 'waink', 'flamingoer', 'basket', 'skytebane'].includes(cat.id)
    let text = (nameIsPlace ? `${item.name} ${item.where}` : item.where).toLowerCase()
    // Norske omskrivinger av stedsnavn som finnes i landemerkedataene.
    for (const [no, en] of aliases) text = text.replaceAll(no, en)
    let best: { name: string; x: number; y: number; spread: number } | null = null
    for (const [key, p] of places) {
      if (!text.includes(key)) continue
      // Hele ord, ikke deler av ord.
      if (!new RegExp(`(^|[^a-zæøå])${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}($|[^a-zæøå])`).test(text)) continue
      const c = centroid(p.pts)
      if (!best || c.spread < best.spread || (c.spread === best.spread && p.name.length > best.name.length)) {
        best = { name: p.name, ...c }
      }
    }
    if (!best) {
      misses.push(`${cat.id}:${idx} ${item.name}`)
      return
    }
    const precision = best.spread < 150 ? 'landemerke' : best.spread < 900 ? 'område' : 'region'
    const z = precision === 'landemerke' ? 4 : precision === 'område' ? 3 : 2
    out[itemId(cat.id, idx)] = { x: Math.round(best.x), y: Math.round(best.y), z, precision, place: best.name }

    // Fliser som dekker utsnittet på alle zoomnivåer brukeren kan velge.
    for (let zz = MIN_Z; zz <= MAX_Z; zz++) {
      const size = 1024 * 2 ** zz
      const px = ((best.x + ZERO) * size) / MAP_W
      const py = ((ZERO - best.y) * size) / MAP_W
      for (let ty = Math.floor((py - VIEW_H / 2) / 256); ty <= Math.floor((py + VIEW_H / 2) / 256); ty++)
        for (let tx = Math.floor((px - VIEW_W / 2) / 256); tx <= Math.floor((px + VIEW_W / 2) / 256); tx++)
          tiles.add(`${zz}/${zz},${ty},${tx}.jpg`)
    }
  })
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
for (let i = 0; i < wanted.length; i += 200) {
  execFileSync('git', ['-C', repo, 'checkout', 'HEAD', '--', ...wanted.slice(i, i + 200)])
}
const dest = 'public/kart'
rmSync(dest, { recursive: true, force: true })
for (const p of wanted) {
  const target = join(dest, p.slice(`maps/tiles/6/${TILESET}/`.length))
  mkdirSync(dirname(target), { recursive: true })
  if (existsSync(join(repo, p))) copyFileSync(join(repo, p), target)
}

writeFileSync('src/data/mapLocations.json', JSON.stringify(out, null, 0) + '\n')
const counts = Object.values(out).reduce<Record<string, number>>((a, l) => ((a[l.precision] = (a[l.precision] ?? 0) + 1), a), {})
console.log(`Plassert: ${Object.keys(out).length}`, counts, `Fliser: ${wanted.length}/${tiles.size}`)
console.log(`Uten sted (${misses.length}):\n  ${misses.join('\n  ')}`)
