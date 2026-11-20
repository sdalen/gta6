import locations from './mapLocations.json'

/** Omtrentlig posisjon for et samleobjekt, laget av scripts/build-map-crops.mts. */
export interface MapLocation {
  x: number
  y: number
  z: number
  precision: 'landemerke' | 'område' | 'region'
  place: string
}

export function getLocation(key: string): MapLocation | undefined {
  return (locations as Record<string, MapLocation>)[key]
}
