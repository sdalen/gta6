import { tips } from '../data/extras'
import type { Tip } from '../data/types'
import { PageHeader, SectionLabel } from './ui'

const order: Tip['category'][] = ['Viktig', 'Progresjon', 'Penger', 'Trofeer']

export function TipsSection() {
  return (
    <div>
      <PageHeader eyebrow="Les først" title="Før du begynner">
        Flere ting i spillet kan ikke gjøres om senere. Her er det viktigste.
      </PageHeader>
      <div className="space-y-12">
        {order.map((cat) => (
          <section key={cat}>
            <SectionLabel>{cat}</SectionLabel>
            <dl className="divide-y divide-line border-y border-line">
              {tips
                .filter((t) => t.category === cat)
                .map((t) => (
                  <div key={t.title} className="py-4 sm:grid sm:grid-cols-[14rem_1fr] sm:gap-6">
                    <dt className="text-[15px] font-medium text-ink">{t.title}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-muted sm:mt-0">{t.body}</dd>
                  </div>
                ))}
            </dl>
          </section>
        ))}
      </div>
    </div>
  )
}
