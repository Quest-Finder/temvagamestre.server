import { Injectable } from '@nestjs/common'
import { SocialMediaRepository } from './repository/social-media-repository'

type SocialMediaServiceModel = {
  id: string
  name: string
  baseUri: string
}

@Injectable()
export class SocialMediaService {
  constructor (private readonly socialMediaRepository: SocialMediaRepository) {}

  async findAll (): Promise<SocialMediaServiceModel[]> {
    return await this.socialMediaRepository.findAll()
  }
}
