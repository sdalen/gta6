import { useEffect, useState } from 'react'
import { useProgress } from './hooks/useProgress'
import { href, useRoute } from './hooks/useRoute'
import { Icon, type IconName } from './components/Icon'
import { HomePage } from './pages/HomePage'
import { MissionsPage } from './pages/MissionsPage'
import { ChapterPage } from './pages/ChapterPage'
import { CollectiblesPage } from './pages/CollectiblesPage'
import { CollectibleCategoryPage } from './pages/CollectibleCategoryPage'
import { CollectibleItemPage } from './pages/CollectibleItemPage'
import { NotFound } from './pages/NotFound'
import { ChallengeCategoryPage, ChallengesPage, RaceChallengesPage } from './pages/ChallengesPage'
import { TipsSection } from './components/TipsSection'
import { OptionalSection } from './components/OptionalSection'
import { MoneySection } from './components/MoneySection'

const tabs: { section: string; label: string; icon: IconName; match: string[] }[] = [
  { section: '', label: 'Hjem', icon: 'home', match: [''] },
  { section: 'oppdrag', label: 'Oppdrag', icon: 'book', match: ['oppdrag', 'kapittel', 'valgfritt'] },
  { section: 'samle', label: 'Samle', icon: 'compass', match: ['samle', 'utfordringer'] },
  { section: 'penger', label: 'Penger', icon: 'coins', match: ['penger'] },
  { section: 'tips', label: 'Tips', icon: 'bulb', match: ['tips'] },
]

export default function App() {
  const { done, toggle, reset } = useProgress()
  const [spoilers, setSpoilers] = useState(true)
  const [section = '', a, b] = useRoute()

  useEffect(() => {
    if (!(section === 'kapittel' && b)) window.scrollTo(0, 0)
  }, [section, a, b])

  let page
  switch (section) {
    case '':
      page = <HomePage done={done} onToggle={toggle} />
      break
    case 'oppdrag':
      page = <MissionsPage done={done} spoilers={spoilers} onToggle={toggle} />
      break
    case 'kapittel':
      page = <ChapterPage number={a} missionId={b} done={done} spoilers={spoilers} onToggle={toggle} />
      break
    case 'samle':
      page =
        a && b ? (
          <CollectibleItemPage catId={a} idx={Number(b)} done={done} onToggle={toggle} />
        ) : a ? (
          <CollectibleCategoryPage id={a} done={done} onToggle={toggle} />
        ) : (
          <CollectiblesPage done={done} />
        )
      break
    case 'utfordringer':
      page =
        a === 'lop' ? (
          <RaceChallengesPage done={done} onToggle={toggle} />
        ) : a ? (
          <ChallengeCategoryPage id={a} done={done} onToggle={toggle} />
        ) : (
          <ChallengesPage done={done} />
        )
      break
    case 'valgfritt':
      page = <OptionalSection />
      break
    case 'penger':
      page = <MoneySection />
      break
    case 'tips':
      page = <TipsSection />
      break
    default:
      page = <NotFound />
  }

  const showSpoilerToggle = section === 'oppdrag' || section === 'kapittel'

  return (
    <div className="min-h-screen pb-28 sm:pb-0">
      <header className="sticky top-0 z-20 border-b border-line bg-header/80 pt-[env(safe-area-inset-top)] backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-3xl items-center gap-8 px-5">
          <a href={href()} className="text-[15px] font-semibold tracking-tight text-ink">
            GTA VI <span className="font-normal text-muted">Guide</span>
          </a>
          <nav className="hidden gap-6 text-sm sm:flex">
            {tabs.slice(1).map((t) => (
              <a
                key={t.section}
                href={href(t.section)}
                className={`transition ${t.match.includes(section) ? 'text-ink' : 'text-muted hover:text-ink'}`}
              >
                {t.label}
              </a>
            ))}
          </nav>
          {showSpoilerToggle && (
            <button
              type="button"
              onClick={() => setSpoilers((s) => !s)}
              className={`ml-auto rounded-full px-3 py-1 text-xs ring-1 transition ${
                spoilers ? 'text-muted ring-zinc-800 hover:ring-frame' : 'bg-accent-dim text-accent ring-accent/40'
              }`}
            >
              {spoilers ? 'Skjul spoilere' : 'Spoilere skjult'}
            </button>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-8 sm:py-14">{page}</main>

      {section === '' && (
        <footer className="mx-auto max-w-3xl px-5 pb-12 pt-4 text-xs leading-relaxed text-faint">
          <p>Uoffisiell fanguide basert på engelske gjennomganger (IGN m.fl.). Ikke tilknyttet Rockstar Games.</p>
          <button
            type="button"
            onClick={() => {
              if (confirm('Nullstille all fremdrift (oppdrag og samleobjekter)?')) reset()
            }}
            className="mt-3 text-muted underline-offset-4 hover:text-red-400 hover:underline"
          >
            Nullstill fremdrift
          </button>
        </footer>
      )}

      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-header/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl sm:hidden">
        <div className="grid grid-cols-5">
          {tabs.map((t) => {
            const active = t.match.includes(section)
            return (
              <a
                key={t.section}
                href={href(t.section)}
                className={`flex flex-col items-center gap-1 pb-2 pt-2.5 text-[10px] font-medium tracking-wide transition ${
                  active ? 'text-ink' : 'text-muted'
                }`}
              >
                <Icon name={t.icon} className={`size-[22px] ${active ? 'text-accent' : ''}`} />
                {t.label}
              </a>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
