import { Injectable } from '@nestjs/common'
import { type PlayerProfileModel } from './repository/model/player-profile.model'
import { PlayersProfileRepository } from './repository/player-profiles.repository'

@Injectable()
export class PlayerProfileService {
  constructor (private readonly playersProfileRepository: PlayersProfileRepository) {}

  async findAll (): Promise<PlayerProfileModel[]> {
    return await this.playersProfileRepository.findAll()
  }
}
