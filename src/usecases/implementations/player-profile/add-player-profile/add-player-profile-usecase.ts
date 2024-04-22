import { type AddPlayerProfile } from '@/domain/contracts/player-profile/add-player-profile'
import { PlayerProfile } from '@/domain/entities/player-profile/player-profile'
import { type AddPlayerProfileRepo } from '@/usecases/contracts/db/player-profile/add-player-profile/add-player-profile-repo'
import { type IdBuilder } from '@/usecases/contracts/id'

export class AddPlayerProfileUsecase implements AddPlayerProfile {
  constructor (
    private readonly addPlayerProfileRepo: AddPlayerProfileRepo,
    private readonly idBuilder: IdBuilder
  ) {}

  async perform (): Promise<void> {
    const playerProfiles = PlayerProfile.getPlayerProfiles()

    for (const playerProfile of playerProfiles) {
      const id = this.idBuilder.build()
      await this.addPlayerProfileRepo.execute({ id, name: playerProfile.name, description: playerProfile.description })
    }
  }
}
