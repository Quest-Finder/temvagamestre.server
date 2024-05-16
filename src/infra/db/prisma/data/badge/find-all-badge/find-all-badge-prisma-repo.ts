import { type BadgeModel } from '@/domain/models/badge/badge-model'
import { type FindAllBadgeRepo } from '@/usecases/contracts/db/badge/find-all-badge-repo'

export class FindAllBadgePrismaRepo implements FindAllBadgeRepo {
  async execute (): Promise<BadgeModel[]> {

  }
}
