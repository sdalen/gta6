import { useEffect, useState } from 'react'
import { Icon } from './Icon'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const isStandalone = () =>
  window.matchMedia('(display-mode: standalone)').matches ||
  (navigator as Navigator & { standalone?: boolean }).standalone === true

const isIos = () => /iphone|ipad|ipod/i.test(navigator.userAgent)

export function InstallButton() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [installed, setInstalled] = useState(isStandalone)
  const [showHelp, setShowHelp] = useState(false)

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault()
      setPrompt(e as BeforeInstallPromptEvent)
    }
    const onInstalled = () => setInstalled(true)
    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  if (installed) return null

  const onClick = async () => {
    if (prompt) {
      await prompt.prompt()
      const { outcome } = await prompt.userChoice
      if (outcome === 'accepted') setInstalled(true)
      setPrompt(null)
    } else {
      setShowHelp((v) => !v)
    }
  }

  return (
    <div className="mt-8 max-w-sm">
      <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper transition hover:opacity-90"
      >
        <Icon name="download" className="size-4" /> Installer app
      </button>
      {showHelp && (
        <div className="mt-4 rounded-xl bg-surface p-4 text-left text-sm leading-relaxed text-ink-soft ring-1 ring-line">
          {isIos() ? (
            <ol className="list-decimal space-y-1 pl-5">
              <li>Åpne siden i Safari.</li>
              <li>
                Trykk på <strong>Del</strong>-knappen (firkant med pil opp).
              </li>
              <li>
                Velg <strong>Legg til på Hjem-skjerm</strong>.
              </li>
            </ol>
          ) : (
            <p>
              Åpne nettlesermenyen (⋮) og velg <strong>Installer app</strong> eller{' '}
              <strong>Legg til på startskjermen</strong>. Fungerer best i Chrome eller Edge.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
