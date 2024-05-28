import { type FindAllBadge } from '@/domain/contracts/badge/find-all-badge'
import { FindAllBadgePrismaRepo } from '@/infra/db/prisma/data/badge/find-all-badge/find-all-badge-prisma-repo'
import { FindAllBadgesUseCase } from '@/usecases/implementations/badge/find-all-badge-usecase'

export const makeFindAllBadgeUseCase = (): FindAllBadge => {
  const findAllBadgePrismaRepository = new FindAllBadgePrismaRepo()
  const findAllBadgeUseCase = new FindAllBadgesUseCase(findAllBadgePrismaRepository)
  return findAllBadgeUseCase
}
