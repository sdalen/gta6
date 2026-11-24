import type { ReactNode } from 'react'
import { Icon } from './Icon'

export function PageHeader({
  back,
  eyebrow,
  title,
  children,
}: {
  back?: { href: string; label: string }
  eyebrow?: string
  title: string
  children?: ReactNode
}) {
  return (
    <header className="mb-10 border-b border-line pb-8 sm:mb-12 sm:pb-10">
      {back && (
        <nav aria-label="Brødsmuler" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted">
          <a href={back.href} className="inline-flex items-center gap-1 transition hover:text-accent">
            <Icon name="left" className="size-3.5 sm:hidden" />
            {back.label}
          </a>
          <span className="hidden text-faint sm:inline">/</span>
          <span className="hidden truncate text-ink sm:inline">{title}</span>
        </nav>
      )}
      {eyebrow && <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>}
      <h1 className="font-serif text-[2.25rem] font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl">{title}</h1>
      {children && <div className="mt-5 max-w-2xl text-[17px] leading-relaxed text-muted">{children}</div>}
    </header>
  )
}

/** Artikkel med sidekolonne («Flere artikler»), som i NMWL-designet. */
export function Article({ children, aside }: { children: ReactNode; aside?: ReactNode }) {
  if (!aside) return <div className="max-w-3xl">{children}</div>
  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
      <div className="min-w-0 max-w-3xl">{children}</div>
      <aside className="border-t border-line pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">{aside}</aside>
    </div>
  )
}

export function MoreLinks({ title = 'Flere artikler', links }: { title?: string; links: { href: string; kicker?: string; label: string; active?: boolean }[] }) {
  return (
    <div className="lg:sticky lg:top-28">
      <h2 className="mb-4 font-serif text-2xl font-medium text-ink">{title}</h2>
      <ul>
        {links.map((l) => (
          <li key={l.href} className="border-b border-line last:border-0">
            <a href={l.href} aria-current={l.active ? 'page' : undefined} className="group block py-4">
              {l.kicker && <span className="block text-sm text-muted">{l.kicker}</span>}
              <span className={`mt-0.5 block font-serif text-lg leading-snug transition group-hover:text-accent ${l.active ? 'text-accent' : 'text-ink'}`}>
                {l.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Overskrift i brødteksten (serif, som «Ulike tradisjoner»). */
export function H2({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h2 id={id} className="mb-4 font-serif text-[1.65rem] font-medium leading-tight text-ink">
      {children}
    </h2>
  )
}

export function ProgressBar({ value, total, className = '' }: { value: number; total: number; className?: string }) {
  const pct = total ? Math.round((value / total) * 100) : 0
  return (
    <div className={`h-1 overflow-hidden rounded-full bg-line ${className}`}>
      <div className="h-full rounded-full bg-accent transition-all duration-500" style={{ width: `${pct}%` }} />
    </div>
  )
}

export function Checkbox({ checked, tone = 'accent' }: { checked: boolean; tone?: 'accent' | 'green' }) {
  const on = tone === 'green' ? 'border-ok bg-ok text-on-accent' : 'border-accent bg-accent text-on-accent'
  return (
    <span
      className={`grid size-5 shrink-0 place-items-center rounded-full border bg-paper transition ${
        checked ? on : 'border-frame group-hover:border-muted'
      }`}
    >
      {checked && <Icon name="check" className="size-3" />}
    </span>
  )
}

export function Callout({ tone = 'neutral', title, children }: { tone?: 'neutral' | 'warn' | 'accent'; title?: string; children: ReactNode }) {
  const bar = { neutral: 'border-frame', warn: 'border-warn', accent: 'border-accent' }[tone]
  return (
    <div className={`border-l-2 ${bar} py-0.5 pl-4 text-sm leading-relaxed text-ink-soft`}>
      {title && <span className="font-medium text-ink">{title} </span>}
      {children}
    </div>
  )
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted">{children}</h2>
}

export function SearchInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <label className="flex flex-1 items-center gap-2 rounded-lg border border-line bg-surface/60 px-3 focus-within:border-frame">
      <Icon name="search" className="size-4 text-muted" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-ink placeholder:text-faint focus:outline-none"
      />
    </label>
  )
}
