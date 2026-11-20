import { useEffect, useState } from 'react'

/** Hash-basert routing (#/kapittel/2). Fungerer på GitHub Pages uten serveroppsett. */
function current(): string[] {
  return window.location.hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent)
}

export function useRoute() {
  const [parts, setParts] = useState(current)

  useEffect(() => {
    const onChange = () => setParts(current())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return parts
}

export const href = (...parts: string[]) => `#/${parts.map(encodeURIComponent).join('/')}`
