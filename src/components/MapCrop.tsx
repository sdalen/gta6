import { useEffect, useRef, useState } from 'react'
import type { MapLocation } from '../data/mapLocations'
import { Icon } from './Icon'

/**
 * Interaktivt kart fra GTADB sitt fellesskapskart (CC BY 4.0), med fliser fra public/kart/.
 * Hele kartet finnes på nivå 0–4. Nivå 5 finnes bare rundt samleobjektene, ellers vises nivå 4 forstørret.
 * Posisjonen er omtrentlig: et landemerke, et område eller et fylke.
 */

const MAP_W = 32768
const ZERO = 16384
const TILE = 256
const HEIGHT = 300
const MIN_Z = 0
const MAX_Z = 5
const FULL_Z = 4

const precisionText: Record<MapLocation['precision'], string> = {
  landemerke: 'Nær',
  område: 'Omtrent i området',
  region: 'Et sted i',
}

/** Spillkoordinat -> piksel på nivå z (flytende). */
const toPx = (gx: number, gy: number, z: number) => {
  const s = (1024 * 2 ** z) / MAP_W
  return { x: (gx + ZERO) * s, y: (ZERO - gy) * s }
}

function TileLayer({ level, z, cx, cy, w }: { level: number; z: number; cx: number; cy: number; w: number }) {
  const scale = 2 ** (z - level)
  const size = TILE * scale
  const c = toPx(cx, cy, z)
  const left = c.x - w / 2
  const top = c.y - HEIGHT / 2
  const imgs = []
  for (let ty = Math.floor(top / size); ty <= Math.floor((top + HEIGHT) / size); ty++)
    for (let tx = Math.floor(left / size); tx <= Math.floor((left + w) / size); tx++) {
      if (tx < 0 || ty < 0) continue
      imgs.push(
        <img
          key={`${level}:${tx},${ty}`}
          src={`${import.meta.env.BASE_URL}kart/${level}/${level},${ty},${tx}.jpg`}
          alt=""
          draggable={false}
          onError={(e) => (e.currentTarget.style.visibility = 'hidden')}
          className="absolute max-w-none select-none"
          style={{ left: tx * size - left, top: ty * size - top, width: size, height: size }}
        />,
      )
    }
  return <>{imgs}</>
}

export function MapCrop({ loc }: { loc: MapLocation }) {
  const ref = useRef<HTMLDivElement>(null)
  const [w, setW] = useState(0)
  const [view, setView] = useState({ z: loc.z, cx: loc.x, cy: loc.y })
  const pointers = useRef(new Map<number, { x: number; y: number }>())
  const pinch = useRef<{ dist: number; z: number } | null>(null)

  useEffect(() => setView({ z: loc.z, cx: loc.x, cy: loc.y }), [loc])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setW(Math.round(e.contentRect.width)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const unitsPerPx = (z: number) => MAP_W / (1024 * 2 ** z)
  const zoomTo = (z: number) => setView((v) => ({ ...v, z: Math.max(MIN_Z, Math.min(MAX_Z, z)) }))

  const onPointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()]
      pinch.current = { dist: Math.hypot(a.x - b.x, a.y - b.y), z: view.z }
    }
  }
  const onPointerMove = (e: React.PointerEvent) => {
    const prev = pointers.current.get(e.pointerId)
    if (!prev) return
    const cur = { x: e.clientX, y: e.clientY }
    pointers.current.set(e.pointerId, cur)
    if (pointers.current.size === 2 && pinch.current) {
      const [a, b] = [...pointers.current.values()]
      const ratio = Math.hypot(a.x - b.x, a.y - b.y) / pinch.current.dist
      zoomTo(Math.round((pinch.current.z + Math.log2(ratio)) * 4) / 4)
      return
    }
    if (pointers.current.size === 1) {
      setView((v) => {
        const u = unitsPerPx(v.z)
        return { ...v, cx: v.cx - (cur.x - prev.x) * u, cy: v.cy + (cur.y - prev.y) * u }
      })
    }
  }
  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId)
    if (pointers.current.size < 2) {
      pinch.current = null
      setView((v) => ({ ...v, z: Math.round(v.z) }))
    }
  }
  const stop = (e: React.PointerEvent) => e.stopPropagation()

  const width = Math.max(w, 1)
  const baseLevel = Math.min(Math.floor(view.z), FULL_Z)
  const marker = toPx(loc.x, loc.y, view.z)
  const center = toPx(view.cx, view.cy, view.z)
  const mx = marker.x - center.x + width / 2
  const my = marker.y - center.y + HEIGHT / 2
  const ring = Math.max(10, Math.min({ landemerke: 120, område: 600, region: 1800 }[loc.precision] / unitsPerPx(view.z), 400))
  const moved = view.z !== loc.z || view.cx !== loc.x || view.cy !== loc.y
  const zoomBtn = 'grid size-9 place-items-center text-lg text-white hover:bg-white/10 disabled:opacity-30'

  return (
    <figure>
      <div
        ref={ref}
        className="relative cursor-grab touch-none select-none overflow-hidden rounded-xl bg-[#3d8fb8] ring-1 ring-zinc-800 active:cursor-grabbing"
        style={{ height: HEIGHT }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDoubleClick={() => zoomTo(Math.round(view.z) + 1)}
      >
        {w > 0 && (
          <>
            <TileLayer level={baseLevel} z={view.z} cx={view.cx} cy={view.cy} w={width} />
            {view.z > FULL_Z && <TileLayer level={MAX_Z} z={view.z} cx={view.cx} cy={view.cy} w={width} />}
            <span
              className="pointer-events-none absolute rounded-full border-2 border-accent bg-accent/15"
              style={{ width: ring * 2, height: ring * 2, left: mx - ring, top: my - ring }}
            />
            <span
              className="pointer-events-none absolute size-3.5 rounded-full border-2 border-white bg-accent shadow-md"
              style={{ left: mx - 7, top: my - 7 }}
            />
            <span
              className="pointer-events-none absolute whitespace-nowrap rounded bg-zinc-950/80 px-1.5 py-0.5 text-[11px] font-medium text-white"
              style={{ left: mx + 12, top: my - 10 }}
            >
              {loc.place}
            </span>
          </>
        )}

        {/* Kartet har alltid nord opp. */}
        <div
          className="pointer-events-none absolute left-2 top-2 size-[4.25rem] rounded-full bg-zinc-950/80 text-[10px] font-semibold text-white ring-1 ring-white/10 backdrop-blur"
          role="img"
          aria-label="Kompass: nord er opp"
        >
          <svg viewBox="0 0 68 68" className="absolute inset-0 size-full">
            <path d="M34 14 39 34H29Z" className="fill-red-400" />
            <path d="M34 54 39 34H29Z" className="fill-white/70" />
          </svg>
          <span className="absolute left-1/2 top-[3px] -translate-x-1/2 text-red-400">N</span>
          <span className="absolute bottom-[3px] left-1/2 -translate-x-1/2">S</span>
          <span className="absolute right-[5px] top-1/2 -translate-y-1/2">Ø</span>
          <span className="absolute left-[5px] top-1/2 -translate-y-1/2">V</span>
        </div>

        <div className="absolute right-2 top-2 flex flex-col overflow-hidden rounded-lg bg-zinc-950/85 ring-1 ring-white/10 backdrop-blur">
          <button type="button" aria-label="Zoom inn" onPointerDown={stop} onDoubleClick={(e) => e.stopPropagation()} onClick={() => zoomTo(Math.round(view.z) + 1)} className={zoomBtn} disabled={view.z >= MAX_Z}>
            +
          </button>
          <button type="button" aria-label="Zoom ut" onPointerDown={stop} onDoubleClick={(e) => e.stopPropagation()} onClick={() => zoomTo(Math.round(view.z) - 1)} className={`${zoomBtn} border-t border-white/10`} disabled={view.z <= MIN_Z}>
            −
          </button>
        </div>
        {moved && (
          <button
            type="button"
            onPointerDown={stop}
            onDoubleClick={(e) => e.stopPropagation()}
            onClick={() => setView({ z: loc.z, cx: loc.x, cy: loc.y })}
            className="absolute bottom-2 right-2 inline-flex items-center gap-1.5 rounded-lg bg-zinc-950/85 px-2.5 py-1.5 text-xs text-white ring-1 ring-white/10 backdrop-blur hover:bg-zinc-900"
          >
            <Icon name="pin" className="size-3.5 text-accent" /> Sentrer
          </button>
        )}
      </div>
      <figcaption className="mt-2 flex flex-wrap justify-between gap-x-4 gap-y-1 text-xs text-muted">
        <span>
          {precisionText[loc.precision]} <span className="text-ink-soft">{loc.place}</span>
          {loc.note ? ` · ${loc.note}` : loc.precision !== 'landemerke' && ' · nøyaktig sted er ikke kartlagt'}
        </span>
        <span className="text-faint">Dra og zoom · Kart: GTA VI Map Tiles (CC BY 4.0), map.gtadb.org</span>
      </figcaption>
    </figure>
  )
}
