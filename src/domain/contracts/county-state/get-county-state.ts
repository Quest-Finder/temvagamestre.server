import { type CityStateError } from '@/domain/errors'
import { type Either } from '@/shared/either'

export type CityStateResponse = Either<CityStateError, void>
export interface GetCityState {
  perform: (uf: string, city: string) => Promise<CityStateResponse>
}
