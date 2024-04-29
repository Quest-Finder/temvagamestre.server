import { AddPlayerProfilePrismaRepo } from '@/infra/db/prisma/data/player-profile/add-player-profile/add-player-profile-prisma-repo'

export const makeAddPlayerProfilePrismaRepo = (): AddPlayerProfilePrismaRepo => {
  return new AddPlayerProfilePrismaRepo()
}
