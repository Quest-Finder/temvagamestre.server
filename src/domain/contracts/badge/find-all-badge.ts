import { type Either } from '@/shared/either'
import { type Badge } from '@prisma/client'

export type FindAllBadgeResponse = Either<Error, Badge[]>

export interface FindAllBadge {
  perform: () => Promise<FindAllBadgeResponse>
}
