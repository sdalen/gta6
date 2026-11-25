import type { ReactNode } from 'react'
import { href } from '../hooks/useRoute'
import { optionalSlug } from '../data/extras'
import { PageHeader, SectionLabel } from '../components/ui'

function Row({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="py-4 sm:grid sm:grid-cols-[12rem_1fr] sm:gap-6">
      <dt className="text-[15px] font-medium text-ink">{title}</dt>
      <dd className="mt-1 text-sm leading-relaxed text-muted sm:mt-0">{children}</dd>
    </div>
  )
}

const link = 'text-accent hover:underline'

const timeline: { when: string; what: string }[] = [
  { when: 'Kapittel 2', what: 'Moses i Port Gellhorn gir deg dirkesett og registrerer biler uten tracker.' },
  { when: 'Tidlig i kapittel 3', what: 'Pay \'n\' Spray kan registrere biler med gul tracker. Registreringen fjerner trackeren.' },
  { when: 'Midt i kapittel 3', what: 'Randy gir deg Key Cloner i Clonin\' Keys, Makin\' GS. Randy\'s Wish List åpner.' },
  { when: 'Kapittel 4', what: 'Etter at du har levert Mamba GT til Randy, kan Pay \'n\' Spray registrere biler med rød tracker.' },
]

export function CarToolsPage() {
  return (
    <div>
      <PageHeader back={{ href: href('biler'), label: 'Biler' }} eyebrow="Biltyveri" title="Key Cloner og trackere">
        Hvilke verktøy du trenger for å stjele biler, når du får dem, og hvordan du blir kvitt trackeren så du kan beholde bilen.
      </PageHeader>

      <section className="mb-12">
        <SectionLabel>Når låses det opp</SectionLabel>
        <ol className="divide-y divide-line border-y border-line">
          {timeline.map((t) => (
            <li key={t.when} className="py-3.5 sm:grid sm:grid-cols-[12rem_1fr] sm:gap-6">
              <span className="text-[15px] font-medium text-ink">{t.when}</span>
              <span className="mt-1 block text-sm leading-relaxed text-muted sm:mt-0">{t.what}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-12">
        <SectionLabel>Key Cloner</SectionLabel>
        <dl className="divide-y divide-line border-y border-line">
          <Row title="Hva det er">
            En app på telefonen som kloner nøkkelen til biler med nøkkelfri tenning. Uten den får du ikke startet de fleste dyre bilene. Å knuse
            ruta eller tjuvkoble hjelper ikke på disse bilene.
          </Row>
          <Row title="Når du får den">
            I hovedoppdraget{' '}
            <a href={href('kapittel', '3', 'clonin-keys')} className={link}>
              Clonin&apos; Keys, Makin&apos; GS
            </a>{' '}
            midt i kapittel 3, der du stjeler en Zorrusso til Randy. Randy sender deg appen underveis i oppdraget. Den kan ikke kjøpes. Både Jason
            og Lucia får den, og dere beholder den resten av spillet.
          </Row>
          <Row title="Hvilke biler">
            Biler med nøkkelfri tenning. Det er nesten bare dyre biler: luksusbiler, sportsbiler, superbiler og dyre elbiler. Eldre og billigere
            biler åpner du med dirkesettet fra Moses.
          </Row>
          <Row title="Slik bruker du den">
            <ol className="list-decimal space-y-1 pl-5 marker:text-faint">
              <li>Skann bilen med WAiNK først (se under).</li>
              <li>Gå bort til førerdøra og trykk Interact (Triangel / Y).</li>
              <li>Velg «Clone Key».</li>
              <li>Beveg høyre stikke til måleren blir rosa, og hold den der til måleren er full.</li>
              <li>Døra åpnes og motoren starter.</li>
            </ol>
          </Row>
          <Row title="Randy's Wish List">
            Listen med Randys bilbestillinger åpner etter Clonin&apos; Keys. Den gir troféet «Supply &amp; Demand».{' '}
            <a href={href('valgfritt', optionalSlug("Randy's Wish List"))} className={link}>
              Se listen
            </a>
            .
          </Row>
        </dl>
      </section>

      <section className="mb-12">
        <SectionLabel>WAiNK-appen</SectionLabel>
        <dl className="divide-y divide-line border-y border-line">
          <Row title="Slik skanner du">Åpne telefonen og WAiNK, og hold R1 / RB mens du ser på bilen.</Row>
          <Row title="Hva du ser">
            Om bilen har tracker (ingen, gul eller rød), om du trenger Key Cloner, sikkerhetsnivå, salgsverdi og hva det koster å registrere den.
            Skann alltid før du stjeler en dyr bil.
          </Row>
        </dl>
      </section>

      <section className="mb-12">
        <SectionLabel>Trackere</SectionLabel>
        <dl className="divide-y divide-line border-y border-line">
          <Row title="Ingen tracker">Vanlige biler. Moses kan registrere dem fra kapittel 2. Den første registreringen hos ham er gratis.</Row>
          <Row title="Gul tracker (standard)">
            Finnes på mellomdyre biler. Moses tar dem ikke. Fra tidlig i kapittel 3 kan alle Pay &apos;n&apos; Spray registrere bilen, og da forsvinner
            trackeren for godt. Bli kvitt politiet først, ellers åpner ikke verkstedet. Guidene er uenige om gul tracker tilkaller politiet.
          </Row>
          <Row title="Rød tracker (avansert)">
            Finnes på sportsbiler og superbiler. Kjører du sakte eller står stille i omtrent fem sekunder, fylles en rød måler over minikartet og
            politiet blir varslet. Hold farten oppe og velg motorvei og brede veier. Nær Randys garasje blir ikonet grått og signalet forsvinner.
          </Row>
          <Row title="Bli kvitt rød tracker">
            Du kan ikke fjerne den selv, og du kan ikke registrere bilen før det er låst opp. Det skjer i kapittel 4 etter at du har levert{' '}
            <a href={href('biler', 'declasse-mamba-gt')} className={link}>
              Mamba GT
            </a>{' '}
            til Randy (oppdraget ¡Dale Mamba!). Randy ringer og sier at Pay &apos;n&apos; Spray nå tar biler med rød tracker. Guidene er litt uenige
            om nøyaktig hvilken levering som låser det opp. Nekter verkstedet, lever flere biler til Randy først.
          </Row>
        </dl>
      </section>

      <section>
        <SectionLabel>Selge eller beholde</SectionLabel>
        <dl className="divide-y divide-line border-y border-line">
          <Row title="Moses">Kjøper og registrerer bare biler uten tracker. Han tar ikke biler som er stjålet rett ved verkstedet hans.</Row>
          <Row title="Pay 'n' Spray">Registrerer gul tracker fra kapittel 3 og rød tracker fra kapittel 4. Du må ha en ledig garasjeplass.</Row>
          <Row title="Pay 'n' Spray med stjerner">
            Går ikke. Verkstedet holder porten stengt så lenge du er ettersøkt. I GTA VI fjerner ikke Pay &apos;n&apos; Spray stjernene slik det gjorde
            i tidligere GTA-spill. Rist av deg politiet først, så åpner porten.
          </Row>
          <Row title="Randy">
            Kjøper dyre biler, også med tracker, i garasjen ved Leonida Auto World i Balsero. Han betaler rundt $30 000–35 000 per bil på listen
            hvis den er uten skade, mindre hvis den er skadet. Leverer du en bil til Randy, mister du den.
          </Row>
        </dl>
        <p className="mt-6 text-sm text-muted">
          Mer om garasjer, registrering og enkeltbiler finner du under{' '}
          <a href={href('biler')} className={link}>
            Biler
          </a>
          .
        </p>
      </section>
    </div>
  )
}
