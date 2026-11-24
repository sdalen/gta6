import locations from './mapLocations.json'

/** Omtrentlig posisjon for et samleobjekt, laget av scripts/build-map-crops.mts. */
export interface MapLocation {
  x: number
  y: number
  z: number
  precision: 'landemerke' | 'område' | 'region'
  place: string
  /** Egen forklaring under kartet i stedet for standardteksten om presisjon. */
  note?: string
  /** Spillbilde av landemerket fra GTADB (public/foto/<id>.jpg). */
  photo?: string
  /** Navnet på landemerket bildet viser. */
  photoOf?: string
}

export function getLocation(key: string): MapLocation | undefined {
  return (locations as Record<string, MapLocation>)[key]
}
