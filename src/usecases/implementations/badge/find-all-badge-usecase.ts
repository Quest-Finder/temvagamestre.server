import { type FindAllBadge, type FindAllBadgeResponse } from '@/domain/contracts/badge/find-all-badge'
import { right } from '@/shared/either'

export class FindAllBadgesUseCase implements FindAllBadge {
  async perform (): Promise<FindAllBadgeResponse> {
    return right([])
  }
}
