import { type FindAllPlayerProfile } from '@/contracts/player-profile/find-all-player-profile'
import { type PlayerProfileModel } from '@/models'

export class FindAllPlayersProfileUseCase implements FindAllPlayerProfile {
  async perform (): Promise<PlayerProfileModel[]> {
    return await Promise.resolve([])
  }
}
