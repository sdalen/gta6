import { useEffect, useState } from 'react'
import { useProgress } from './hooks/useProgress'
import { href, useRoute } from './hooks/useRoute'
import { Icon, type IconName } from './components/Icon'
import { HomePage } from './pages/HomePage'
import { MissionsPage } from './pages/MissionsPage'
import { ChapterPage } from './pages/ChapterPage'
import { CollectiblesPage, RobberiesPage } from './pages/CollectiblesPage'
import { CollectibleCategoryPage } from './pages/CollectibleCategoryPage'
import { CollectibleItemPage } from './pages/CollectibleItemPage'
import { NotFound } from './pages/NotFound'
import { ChallengeCategoryPage, ChallengesPage, RaceChallengesPage } from './pages/ChallengesPage'
import { TipsSection } from './components/TipsSection'
import { OptionalSection } from './components/OptionalSection'
import { DataSection } from './components/DataSection'
import { MoneySection } from './components/MoneySection'
import { GlitchesPage, GlitchPage } from './pages/GlitchesPage'
import { CarPage, CarsPage } from './pages/CarsPage'
import { CarToolsPage } from './pages/CarToolsPage'

const tabs: { section: string; label: string; icon: IconName; match: string[] }[] = [
  { section: '', label: 'Hjem', icon: 'home', match: [''] },
  { section: 'oppdrag', label: 'Oppdrag', icon: 'book', match: ['oppdrag', 'kapittel', 'valgfritt'] },
  { section: 'samle', label: 'Samle', icon: 'compass', match: ['samle', 'utfordringer', 'ran'] },
  { section: 'glitcher', label: 'Glitcher', icon: 'bug', match: ['glitcher'] },
  { section: 'biler', label: 'Biler', icon: 'car', match: ['biler', 'bilverktoy'] },
  { section: 'penger', label: 'Penger', icon: 'coins', match: ['penger', 'tips'] },
]

const iconBtn =
  'grid size-9 place-items-center rounded-md text-muted transition hover:bg-surface hover:text-ink disabled:pointer-events-none disabled:opacity-30'

export default function App() {
  const { done, toggle, setMany, reset, replace, merge, undo, redo } = useProgress()
  const [panelOpen, setPanelOpen] = useState(false)
  const [spoilers, setSpoilers] = useState(true)
  const [section = '', a, b] = useRoute()

  useEffect(() => {
    if (!(section === 'kapittel' && b) && !(section === 'valgfritt' && a && a !== 'kapittel')) window.scrollTo(0, 0)
    setPanelOpen(false)
  }, [section, a, b])

  // ⌘Z / Ctrl+Z angrer, ⇧⌘Z / Ctrl+Y gjør om. Ikke mens man skriver i et felt.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPanelOpen(false)
      const t = e.target as HTMLElement
      if (t.closest('input, textarea, [contenteditable="true"]')) return
      if (!(e.metaKey || e.ctrlKey)) return
      const k = e.key.toLowerCase()
      if (k === 'z' && !e.shiftKey) undo()
      else if ((k === 'z' && e.shiftKey) || k === 'y') redo()
      else return
      e.preventDefault()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [undo, redo])

  let page
  switch (section) {
    case '':
      page = <HomePage done={done} spoilers={spoilers} onToggle={toggle} />
      break
    case 'oppdrag':
      page = <MissionsPage done={done} spoilers={spoilers} onToggle={toggle} onSetMany={setMany} />
      break
    case 'kapittel':
      page = <ChapterPage number={a} missionId={b} done={done} spoilers={spoilers} onToggle={toggle} onSetMany={setMany} />
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
    case 'ran':
      page = <RobberiesPage done={done} />
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
      page =
        a === 'kapittel' ? (
          <OptionalSection done={done} onToggle={toggle} onSetMany={setMany} chapter={b} />
        ) : (
          <OptionalSection done={done} onToggle={toggle} onSetMany={setMany} focus={a} />
        )
      break
    case 'penger':
      page = <MoneySection />
      break
    case 'glitcher':
      page = a ? <GlitchPage id={a} /> : <GlitchesPage />
      break
    case 'biler':
      page = a ? <CarPage id={a} /> : <CarsPage />
      break
    case 'bilverktoy':
      page = <CarToolsPage />
      break
    case 'tips':
      page = <TipsSection />
      break
    default:
      page = <NotFound />
  }

  const wide = (section === 'samle' && !!b) || section === 'glitcher' || section === 'biler'
  const showSpoilerToggle = section === 'oppdrag' || section === 'kapittel'

  return (
    <div className="flex min-h-screen flex-col pb-24 lg:pb-0">
      <header className="sticky top-0 z-20 border-b border-line bg-header/90 pt-[env(safe-area-inset-top)] backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:h-20 sm:px-6 lg:gap-10">
          <a href={href()} className="flex shrink-0 items-center gap-3 text-ink">
            <span className="grid size-10 place-items-center rounded-full bg-accent font-serif text-[15px] font-bold text-on-accent ring-4 ring-accent-dim sm:size-12 sm:text-base">
              VI
            </span>
            <span className="text-[13px] font-bold uppercase tracking-[0.16em] sm:text-sm">GTA VI Guide</span>
          </a>
          <nav className="ml-auto hidden gap-7 text-[15px] font-medium lg:flex">
            {tabs.slice(1).map((t) => {
              const active = t.match.includes(section)
              return (
                <a
                  key={t.section}
                  href={href(t.section)}
                  aria-current={active ? 'page' : undefined}
                  className={`relative py-2 transition after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:transition ${
                    active ? 'text-accent after:bg-accent' : 'text-ink after:bg-transparent hover:text-accent'
                  }`}
                >
                  {t.label}
                </a>
              )
            })}
          </nav>
          <div className="ml-auto flex items-center gap-1 lg:ml-0">
            {showSpoilerToggle && (
              <button
                type="button"
                onClick={() => setSpoilers((s) => !s)}
                className={`mr-1 hidden rounded-full px-3 py-1 text-xs ring-1 transition sm:inline-block ${
                  spoilers ? 'text-muted ring-line hover:ring-frame' : 'bg-accent-dim text-accent ring-accent/40'
                }`}
              >
                {spoilers ? 'Skjul spoilere' : 'Spoilere skjult'}
              </button>
            )}
            <a
              href={href('bilverktoy')}
              title="Key Cloner og trackere"
              aria-label="Key Cloner og trackere"
              className={`${iconBtn} ${section === 'bilverktoy' ? 'bg-accent-dim text-accent' : ''}`}
            >
              <Icon name="key" className="size-[18px]" />
            </a>
            <button
              type="button"
              onClick={() => setPanelOpen((o) => !o)}
              aria-expanded={panelOpen}
              className={`ml-2 hidden h-11 items-center gap-2 rounded-sm px-5 text-[15px] font-semibold transition sm:inline-flex ${
                panelOpen ? 'bg-accent-dark text-on-accent' : 'bg-accent text-on-accent hover:bg-accent-dark'
              }`}
            >
              <Icon name="save" className="size-4" />
              Lagring
            </button>
            <button
              type="button"
              onClick={() => setPanelOpen((o) => !o)}
              aria-expanded={panelOpen}
              aria-label="Lagring"
              className={`${iconBtn} sm:hidden ${panelOpen ? 'bg-accent-dim text-accent' : ''}`}
            >
              <Icon name="save" className="size-[18px]" />
            </button>
          </div>
        </div>
        {panelOpen && (
          <div className="border-t border-line">
            <div className="mx-auto max-h-[calc(100dvh-7rem)] max-w-3xl overflow-y-auto px-4 py-6 sm:px-6">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-serif text-2xl font-medium text-ink">Lagring</h2>
                <button type="button" onClick={() => setPanelOpen(false)} aria-label="Lukk" className={iconBtn}>
                  <Icon name="close" className="size-[18px]" />
                </button>
              </div>
              <DataSection done={done} onReplace={replace} onMerge={merge} onReset={reset} />
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-16">
        {/* Artikler med sidekolonne bruker hele bredden, resten holder seg til lesebredde. */}
        <div className={wide ? '' : 'max-w-3xl'}>{page}</div>
      </main>

      <footer className="mt-8 bg-footer text-[#c9ccd1]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 text-sm sm:grid-cols-[1fr_auto] sm:px-6">
          <div>
            <p className="font-serif text-xl text-white">GTA VI Guide</p>
            <p className="mt-2 max-w-md leading-relaxed text-[#9aa1a9]">
              Uoffisiell norsk fanguide basert på engelske gjennomganger. Ikke tilknyttet Rockstar Games. Kart: GTA VI Map Tiles (CC BY 4.0),
              map.gtadb.org.
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-x-10 gap-y-2">
            {tabs.slice(1).map((t) => (
              <a key={t.section} href={href(t.section)} className="hover:text-white">
                {t.label}
              </a>
            ))}
            <a href={href('tips')} className="hover:text-white">
              Tips
            </a>
          </nav>
        </div>
      </footer>

      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-header/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden">
        <div className="grid grid-cols-6">
          {tabs.map((t) => {
            const active = t.match.includes(section)
            return (
              <a
                key={t.section}
                href={href(t.section)}
                className={`flex flex-col items-center gap-1 pb-2 pt-2.5 text-[10px] font-medium tracking-wide transition ${
                  active ? 'text-accent' : 'text-muted'
                }`}
              >
                <Icon name={t.icon} className="size-[22px]" />
                {t.label}
              </a>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
