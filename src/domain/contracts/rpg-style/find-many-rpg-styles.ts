import { type RpgStyleModel } from '@/domain/models'
import { type Either } from '@/shared/either'

export type FindManyRpgStylesResponse = Either<Error, RpgStyleModel[] | []>

export interface FindManyRpgStyles {
  perform: () => Promise<FindManyRpgStylesResponse>
}
