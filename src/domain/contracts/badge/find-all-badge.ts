import { type BadgeModel } from '@/domain/models/badge/badge-model'
import { type Either } from '@/shared/either'

export type FindAllBadgeResponse = Either<Error, BadgeModel[]>

export interface FindAllBadge {
  perform: () => Promise<FindAllBadgeResponse>
}
