import { useState } from 'react'
import type { Stop } from '../data/types'
import { MapCrop } from './MapCrop'
import { LandmarkPhoto } from './LandmarkPhoto'

/** Oppdrag med flere steder: nummererte stopp, ett felles kart og bilde av det valgte stedet. */
export function StopsGuide({ stops }: { stops: Stop[] }) {
  const placed = stops.map((s, i) => ({ ...s, n: i + 1 })).filter((s) => s.loc)
  const [active, setActive] = useState(placed[0]?.n ?? 1)
  const current = placed.find((s) => s.n === active) ?? placed[0]
  const points = placed.map((s) => ({ x: s.loc!.x, y: s.loc!.y, n: s.n }))

  return (
    <div className="mt-4 space-y-5">
      <ol className="space-y-2">
        {stops.map((s, i) => {
          const n = i + 1
          const canShow = !!s.loc
          const isActive = canShow && n === current?.n
          return (
            <li key={s.title}>
              <button
                type="button"
                disabled={!canShow}
                onClick={() => setActive(n)}
                className={`flex w-full gap-3 rounded-lg p-3 text-left text-sm leading-relaxed transition ${
                  isActive ? 'bg-accent-dim ring-1 ring-accent/40' : canShow ? 'hover:bg-surface' : ''
                }`}
              >
                <span
                  className={`grid size-6 shrink-0 place-items-center rounded-full text-xs font-bold ${
                    isActive ? 'bg-accent text-on-accent' : 'bg-ink/80 text-paper'
                  }`}
                >
                  {n}
                </span>
                <span className="min-w-0">
                  <span className="block font-medium text-ink">{s.title}</span>
                  <span className="text-ink-soft">{s.text}</span>
                  {!canShow && <span className="mt-0.5 block text-xs text-faint">Ikke på kartet: stedet finnes ikke i kartdataene.</span>}
                </span>
              </button>
            </li>
          )
        })}
      </ol>
      {current?.loc && (
        <div>
          {current.loc.photo && <LandmarkPhoto key={current.loc.photo} id={current.loc.photo} name={current.loc.photoOf ?? current.loc.place} />}
          <MapCrop loc={current.loc} points={points} />
        </div>
      )}
    </div>
  )
}
