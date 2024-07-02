import { SaveUserPreferenceGamePlacePrismaRepo } from '@/infra/database/prisma/data/user-preference-game-place/save-user-preference-game-place/save-user-preference-game-place-prisma-repo'
import { type SaveUserPreferenceGamePlaceRepo } from '@/usecases/contracts/db/user-preference-game-place'

export const makeSaveUserPreferenceGamePlacePrismaRepo = (): SaveUserPreferenceGamePlaceRepo => {
  return new SaveUserPreferenceGamePlacePrismaRepo()
}
