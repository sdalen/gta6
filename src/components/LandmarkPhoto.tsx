import { useState } from 'react'

/** Spillbilde av et landemerke fra GTADB (CC BY 4.0), lagt i public/foto/ av scripts/build-map-crops.mts. */
export function LandmarkPhoto({ id, name }: { id: string; name: string }) {
  const [failed, setFailed] = useState(false)
  if (failed) return null
  return (
    <figure className="mb-6">
      <img
        src={`${import.meta.env.BASE_URL}foto/${id}.jpg`}
        alt={`${name} i spillet`}
        loading="lazy"
        onError={() => setFailed(true)}
        className="aspect-video w-full rounded-lg bg-surface object-cover ring-1 ring-line"
      />
      <figcaption className="mt-2 text-sm text-muted">
        <span className="text-ink-soft">{name}</span> sett utenfra i spillet · Foto: GTA VI Landmarks Data (CC BY 4.0), map.gtadb.org
      </figcaption>
    </figure>
  )
}
