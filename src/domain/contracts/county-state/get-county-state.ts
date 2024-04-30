import { type CountyStateError } from '@/domain/errors/county-state-error'
import { type Either } from '@/shared/either'

export type CountyStateResponse = Either<CountyStateError, void>
export interface GetCountyState {
  perform: (uf: string, county: string) => Promise<CountyStateResponse>
}
