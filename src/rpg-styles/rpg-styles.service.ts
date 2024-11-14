import { Injectable } from '@nestjs/common'
import { RpgStylesRepository } from './repository/rpg-styles.repository'

type RgpStyleServiceModel = {
  id: string
  name: string
}

@Injectable()
export class RpgStylesService {
  constructor (private readonly rgpStylesRepository: RpgStylesRepository) {}

  async findAll (): Promise<RgpStyleServiceModel[]> {
    return await this.rgpStylesRepository.findAll()
  }
}
