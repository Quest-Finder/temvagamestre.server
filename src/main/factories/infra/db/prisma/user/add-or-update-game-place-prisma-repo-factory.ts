import { AddOrUpdateGamePlacePrismaRepo } from '@/infra/db/prisma/user/add-or-update-game-place/add-or-update-game-place-prisma-repo'

export const makeAddOrUpdateGamePlacePrismaRepo = (): AddOrUpdateGamePlacePrismaRepo => {
  return new AddOrUpdateGamePlacePrismaRepo()
}
