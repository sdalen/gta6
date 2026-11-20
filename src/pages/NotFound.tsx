import { href } from '../hooks/useRoute'

export function NotFound() {
  return (
    <div className="py-24 text-center">
      <p className="text-4xl font-semibold tracking-tight text-ink">Wasted</p>
      <p className="mt-2 text-sm text-muted">Fant ikke siden.</p>
      <a href={href()} className="mt-6 inline-block text-sm text-accent hover:underline">
        Til forsiden
      </a>
    </div>
  )
}
