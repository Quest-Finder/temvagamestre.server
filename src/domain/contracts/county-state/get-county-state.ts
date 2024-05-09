import { type CityStateError } from '@/domain/errors'
import { type Either } from '@/shared/either'

export type CityStateResponse = Either<CityStateError, string[]>
export interface GetCityState {
  perform: (uf: string, session?: any, city?: string) => Promise<CityStateResponse>
}
