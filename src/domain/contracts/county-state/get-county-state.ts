import { type CityStateError } from '@/domain/errors/county-state-error'
import { type Either } from '@/shared/either'

export type CityStateResponse = Either<CityStateError, void>
export interface GetCityState {
  perform: (uf: string, county: string) => Promise<CityStateResponse>
}
