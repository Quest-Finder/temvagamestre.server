import { AddPlayerProfilePrismaRepo } from '@/infra/database/prisma/data/player-profile/add-player-profile/add-player-profile-prisma-repo'

export const makeAddPlayerProfilePrismaRepo = (): AddPlayerProfilePrismaRepo => {
  return new AddPlayerProfilePrismaRepo()
}
