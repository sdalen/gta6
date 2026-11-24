import data from './cars.json'

/**
 * Eksklusive biler du kan beholde, og hvordan garasjene virker. Fra fanguider skrevet de første dagene etter lansering
 * (HotCars, Push Square, gta6.house, game-checklists, leonidahub, meowdb, gtabase m.fl.). Mange steder er bare bekreftet av én kilde.
 */
export interface Car {
  id: string
  name: string
  class: string
  rarity: 'unik' | 'sjelden' | 'vanlig men dyr'
  value?: string
  location: { place: string; area: string; detail: string }
  spawn?: string
  missable: boolean
  deadline?: string | null
  when: string
  steps: string[]
  tips?: string[]
  sources?: string[]
}

export interface Garage {
  name: string
  character: string
  unlock: string
  capacity: string
  place: string
  area: string
}

export const cars = data.cars as Car[]
export const garages = data.garages as Garage[]
export const garageRules = data.garageRules as { title: string; body: string }[]

export const rarityText: Record<Car['rarity'], string> = {
  unik: 'Unik',
  sjelden: 'Sjelden',
  'vanlig men dyr': 'Dyr',
}
