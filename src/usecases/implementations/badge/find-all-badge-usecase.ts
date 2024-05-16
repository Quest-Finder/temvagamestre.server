import { type FindAllBadge, type FindAllBadgeResponse } from '@/domain/contracts/badge/find-all-badge'
import { right } from '@/shared/either'
import { type FindAllBadgeRepo } from '@/usecases/contracts/db/badge/find-all-badge-repo'

export class FindAllBadgesUseCase implements FindAllBadge {
  constructor (private readonly findAllBadgesRepository: FindAllBadgeRepo) {}

  async perform (): Promise<FindAllBadgeResponse> {
    const result = await this.findAllBadgesRepository.execute()
    return right(result)
  }
}
