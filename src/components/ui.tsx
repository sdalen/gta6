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
    <header className="mb-10">
      {back && (
        <a
          href={back.href}
          className="-ml-1 mb-8 inline-flex items-center gap-1 rounded-md px-1 py-1 text-sm text-muted transition hover:text-ink"
        >
          <Icon name="left" className="size-4" />
          {back.label}
        </a>
      )}
      {eyebrow && <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-accent">{eyebrow}</p>}
      <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h1>
      {children && <div className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">{children}</div>}
    </header>
  )
}

export function ProgressBar({ value, total, className = '' }: { value: number; total: number; className?: string }) {
  const pct = total ? Math.round((value / total) * 100) : 0
  return (
    <div className={`h-1 overflow-hidden rounded-full bg-zinc-800 ${className}`}>
      <div className="h-full rounded-full bg-accent transition-all duration-500" style={{ width: `${pct}%` }} />
    </div>
  )
}

export function Checkbox({ checked }: { checked: boolean }) {
  return (
    <span
      className={`grid size-5 shrink-0 place-items-center rounded-full border transition ${
        checked ? 'border-accent bg-accent text-zinc-950' : 'border-frame group-hover:border-zinc-400'
      }`}
    >
      {checked && <Icon name="check" className="size-3" />}
    </span>
  )
}

export function Callout({ tone = 'neutral', title, children }: { tone?: 'neutral' | 'warn' | 'accent'; title?: string; children: ReactNode }) {
  const bar = { neutral: 'border-frame', warn: 'border-red-400', accent: 'border-accent' }[tone]
  return (
    <div className={`border-l-2 ${bar} py-0.5 pl-4 text-sm leading-relaxed text-ink-soft`}>
      {title && <span className="font-medium text-ink">{title} </span>}
      {children}
    </div>
  )
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-muted">{children}</h2>
}

export function SearchInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <label className="flex flex-1 items-center gap-2 rounded-lg border border-zinc-800 bg-surface/60 px-3 focus-within:border-frame">
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
