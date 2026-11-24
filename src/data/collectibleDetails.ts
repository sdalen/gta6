import details from './collectibleDetails.json' with { type: 'json' }

/** Detaljert veibeskrivelse for et samleobjekt. Satt sammen fra flere guider (se kilder på siden). */
export interface CollectibleDetail {
  /** Bydel og fylke. */
  area?: string
  /** Nærmeste navngitte sted på kartet (engelsk, som i spillet). */
  landmark?: string
  /** Veien inn, steg for steg. */
  route?: string[]
  /** Nøyaktig hvor tingen ligger. */
  spot?: string
  /** Låst dør, safekode, oppdrag eller tidspunkt som stopper deg. */
  access?: string
  confidence?: 'høy' | 'middels' | 'lav'
  sources?: string[]
  /** Hvor i spillet du finner koden til safen eller døra. */
  codeHint?: string
  /** Koden til safen eller døra, vist som merke ved navnet. */
  code?: string
  /** Forventet utbytte: hva som ligger i safen. */
  loot?: string
}

export function getDetail(key: string): CollectibleDetail | undefined {
  return (details as Record<string, CollectibleDetail>)[key]
}
