import { chapters } from './chapters'
import { collectibles, itemId } from './collectibles'
import { challengeCategories, challengeId, raceChallenges, raceId } from './challenges'
import { optionalMissions, questlines, questlineTrophies, tips } from './extras'
import { moneyPlan } from './money'
import { glitches } from './glitches'
import { cars } from './cars'
import { getDetail } from './collectibleDetails'
import { startIndexes } from './missionIndex'
import { href } from '../hooks/useRoute'

/** Ett søkbart element på startsiden. */
export interface SearchEntry {
  key: string
  group: string
  title: string
  sub: string
  to: string
  /** Nøkkel i fremdriften hvis elementet kan hukes av. */
  doneKey?: string
  /** Tekst som alltid er søkbar. */
  text: string
  /** Tekst som bare er søkbar når spoilere vises. */
  spoilerText?: string
}

const join = (...parts: (string | undefined | null | false)[]) => parts.filter(Boolean).join(' ')

const entries: SearchEntry[] = []

chapters.forEach((c, ci) =>
  c.missions.forEach((m, mi) =>
    entries.push({
      key: `oppdrag:${m.id}`,
      group: 'Hovedoppdrag',
      title: `${startIndexes[ci] + mi}. ${m.name}`,
      sub: join(`Kapittel ${c.number}`, m.character && `· ${m.character}`, m.task && `· ${m.task}`),
      to: href('kapittel', c.number, m.id),
      doneKey: m.id,
      text: join(m.name, m.task, m.character, m.tip, m.tag, c.title, c.titleNo),
      spoilerText: join(m.summary, m.warning, ...(m.steps ?? [])),
    }),
  ),
)

for (const o of optionalMissions)
  entries.push({
    key: `valgfritt:${o.name}`,
    group: 'Valgfrie oppdrag',
    title: o.name,
    sub: join(`Kap. ${o.chapter}`, o.character && `· ${o.character}`, `· ${o.note}`),
    to: href('valgfritt'),
    doneKey: `valgfritt:${o.name}`,
    text: join(o.name, o.character, o.note, ...(o.steps ?? [])),
  })

for (const q of questlines)
  entries.push({
    key: `oppdragsgiver:${q.giver}`,
    group: 'Strangers & Freaks',
    title: q.giver,
    sub: join(q.countsForTrophy === true ? 'Teller for troféet' : q.countsForTrophy === false ? 'Teller ikke' : 'Usikkert om det teller', q.note && `· ${q.note}`),
    to: href('valgfritt'),
    text: join(q.giver, q.note),
  })
for (const t of questlineTrophies)
  entries.push({
    key: `trofe:${t.questline}`,
    group: 'Strangers & Freaks',
    title: t.questline,
    sub: `Trofé: ${t.trophy}`,
    to: href('valgfritt'),
    text: join(t.questline, t.trophy),
  })

for (const cat of collectibles) {
  entries.push({
    key: `samlekategori:${cat.id}`,
    group: cat.kind === 'ran' ? 'Ran' : 'Samleobjekter',
    title: cat.name,
    sub: join(cat.total, cat.reward && `· ${cat.reward}`),
    to: href('samle', cat.id),
    text: join(cat.name, cat.total, cat.reward, cat.about, ...cat.howTo, ...(cat.tips ?? [])),
  })
  cat.items.forEach((item, idx) =>
    entries.push({
      key: itemId(cat.id, idx),
      group: cat.kind === 'ran' ? 'Ran' : 'Samleobjekter',
      title: item.name,
      sub: `${cat.name} · ${item.where}`,
      to: href('samle', cat.id, String(idx)),
      doneKey: itemId(cat.id, idx),
      text: join(item.name, item.where, cat.name, getDetail(itemId(cat.id, idx))?.landmark, getDetail(itemId(cat.id, idx))?.area),
    }),
  )
}

for (const g of glitches)
  entries.push({
    key: `glitch:${g.id}`,
    group: 'Pengeglitcher',
    title: g.name,
    sub: join(g.location.place, g.payout && `· ${g.payout.split('.')[0]}`),
    to: href('glitcher', g.id),
    text: join(g.name, g.location.place, g.location.area, g.location.detail, 'glitch penger money'),
  })

for (const c of cars)
  entries.push({
    key: `bil:${c.id}`,
    group: 'Eksklusive biler',
    title: c.name,
    sub: join(c.class, `· ${c.location.place}`),
    to: href('biler', c.id),
    text: join(c.name, c.class, c.location.place, c.location.area, c.location.detail, 'bil garasje'),
  })

for (const cat of challengeCategories) {
  entries.push({
    key: `utfordringskategori:${cat.id}`,
    group: 'Challenges',
    title: `${cat.name} (kategori)`,
    sub: `5 fullført: ${cat.reward5} · 10 fullført: ${cat.reward10}`,
    to: href('utfordringer', cat.id),
    text: join(cat.name, cat.reward5, cat.reward10),
  })
  cat.items.forEach((ch, idx) =>
    entries.push({
      key: challengeId(cat.id, idx),
      group: 'Challenges',
      title: ch.name,
      sub: `${cat.name} · ${ch.goal}`,
      to: href('utfordringer', cat.id),
      doneKey: challengeId(cat.id, idx),
      text: join(ch.name, ch.goal, ch.tip, cat.name),
    }),
  )
}
raceChallenges.forEach((r, idx) =>
  entries.push({
    key: raceId(idx),
    group: 'Challenges',
    title: r.name,
    sub: `Løp · ${r.where} · Gull ${r.gold}`,
    to: href('utfordringer', 'lop'),
    doneKey: raceId(idx),
    text: join(r.name, r.where, r.note, 'løp'),
  }),
)

for (const p of moneyPlan)
  for (const m of p.methods)
    entries.push({
      key: `penger:${p.phase}:${m.name}`,
      group: 'Penger',
      title: m.name,
      sub: `${p.chapters} · ${m.payout} · ${m.unlock}`,
      to: href('penger'),
      text: join(m.name, m.unlock, ...m.how),
    })

for (const t of tips)
  entries.push({
    key: `tips:${t.title}`,
    group: 'Tips',
    title: t.title,
    sub: `${t.category} · ${t.body}`,
    to: href('tips'),
    text: join(t.title, t.body, t.category),
  })

const lower = new Map(entries.map((e) => [e.key, { text: e.text.toLowerCase(), spoiler: e.spoilerText?.toLowerCase() ?? '' }]))

/** Søk i alt innhold. Alle ord i søket må finnes (i hvilken som helst rekkefølge). Navnetreff kommer først. */
export function searchAll(query: string, spoilers: boolean): SearchEntry[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (!words.length) return []
  const hits = entries.filter((e) => {
    const l = lower.get(e.key)!
    const hay = spoilers ? `${l.text} ${l.spoiler}` : l.text
    return words.every((w) => hay.includes(w))
  })
  const q = query.trim().toLowerCase()
  const rank = (e: SearchEntry) => {
    const t = e.title.toLowerCase()
    return t.includes(q) ? 0 : words.every((w) => t.includes(w)) ? 1 : 2
  }
  // Array.sort er stabil, så rekkefølgen i guiden beholdes innenfor samme rang.
  return hits.sort((a, b) => rank(a) - rank(b))
}

export const searchGroups = ['Hovedoppdrag', 'Valgfrie oppdrag', 'Strangers & Freaks', 'Samleobjekter', 'Ran', 'Challenges', 'Penger', 'Tips']
