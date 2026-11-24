import { collectibles, collectibleSources, itemId, robberySources, type CollectibleCategory } from '../data/collectibles'
import { href } from '../hooks/useRoute'
import { Icon } from '../components/Icon'
import { PageHeader, ProgressBar } from '../components/ui'

export function CollectiblesPage({ done }: { done: Set<string> }) {
  return (
    <div>
      <PageHeader eyebrow="Utforsk Leonida" title="Samleobjekter">
        Lokasjoner fra de første guidene etter lansering. Listene fylles på etter hvert. I spillet ser du fremdriften
        under Progress → Collections og i kartfilteret Exploration.
      </PageHeader>

      <a
        href={href('utfordringer')}
        className="group mb-8 flex items-center justify-between gap-4 rounded-xl bg-surface p-5 ring-1 ring-line transition hover:ring-frame"
      >
        <span>
          <span className="block text-xs uppercase tracking-[0.18em] text-muted">80 utfordringer + 13 løp</span>
          <span className="mt-1 block text-lg font-medium text-ink">Challenges</span>
        </span>
        <Icon name="right" className="size-5 text-accent transition group-hover:translate-x-0.5" />
      </a>

      <CategoryList categories={collectibles.filter((c) => c.kind !== 'ran')} done={done} />

      <p className="mt-8 text-xs leading-relaxed text-faint">
        Kilder:{' '}
        {collectibleSources.map((s) => s.name).join(' · ')}
      </p>
    </div>
  )
}

export function RobberiesPage({ done }: { done: Set<string> }) {
  const cats = collectibles.filter((c) => c.kind === 'ran')
  return (
    <div>
      <PageHeader eyebrow="Penger" title="Ran">
        Alle steder du kan rane: butikker, smykkebutikker og pantelånere, lånebutikker, banker og hvelv, gjengoperasjoner
        og minibanker. Ingenting forsvinner, så du kan ta det når det passer. Se også{' '}
        <a href={href('penger')} className="text-accent hover:underline">
          pengestrategien
        </a>
        .
      </PageHeader>
      <CategoryList categories={cats} done={done} />
      <p className="mt-8 text-xs leading-relaxed text-faint">
        Kilder: {robberySources.map((s) => s.name).join(' · ')}. Kartpunktene er omtrentlige.
      </p>
    </div>
  )
}

function CategoryList({ categories, done }: { categories: CollectibleCategory[]; done: Set<string> }) {
  return (
    <ul className="divide-y divide-line border-y border-line">
        {categories.map((c) => {
          const found = c.items.filter((_, i) => done.has(itemId(c.id, i))).length
          return (
            <li key={c.id}>
              <a href={href('samle', c.id)} className="group flex items-center gap-4 py-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-surface text-muted ring-1 ring-line transition group-hover:text-accent">
                  <Icon name={c.icon} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-medium text-ink">{c.name}</span>
                  <span className="mt-1.5 flex items-center gap-3">
                    <ProgressBar value={found} total={c.items.length} className="max-w-40 flex-1" />
                    <span className="text-xs tabular-nums text-muted">
                      {found}/{c.items.length}
                    </span>
                  </span>
                </span>
                <Icon name="right" className="size-4 text-faint transition group-hover:translate-x-0.5 group-hover:text-ink-soft" />
              </a>
            </li>
          )
        })}
      </ul>
  )
}
