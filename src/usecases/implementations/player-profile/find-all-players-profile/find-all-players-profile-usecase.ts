import { type FindAllPlayerProfile } from '@/contracts/player-profile/find-all-player-profile'
import { type PlayerProfileModel } from '@/models'
import { type FindAllPlayerProfileRepo } from '@/usecases/contracts/db/player-profile/find-all-players-profile-repo'

export class FindAllPlayersProfileUseCase implements FindAllPlayerProfile {
  constructor (private readonly findAllPlayersRepository: FindAllPlayerProfileRepo) {}

  async perform (): Promise<PlayerProfileModel[]> {
    const result = await this.findAllPlayersRepository.execute()
    return result
  }
}
