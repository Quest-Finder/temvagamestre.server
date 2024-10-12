import { CityStateRepository } from '@/city-state/repository/city-state-repository'
import { type CityStateModel } from '@/city-state/repository/entity/city-state.model'
import { PlayersProfileRepository } from '@/player-profile/repository/player-profiles.repository'
import { RpgStylesRepository } from '@/rpg-styles/repository/rpg-styles.repository'
import { AppException } from '@/shared/exceptions/app-exception'
import { IbgeService } from '@/shared/integration/ibge/ibge.service'
import { SocialMediaRepository } from '@/social-media/repository/social-media-repository'
import { UserRepository } from '@/users/repository/user/user-repository'
import { Injectable } from '@nestjs/common'
import Filter from 'bad-words'

export type RegisterUserInputModel = {
  socialMediaId: string
  userLink: string
}

export type InputUserService = {
  id: string
  user: {
    name: string
    username: string
    pronoun: string
    dateOfBirth: Date
    playerProfileId: string
    rpgStyles: string[]
    socialMedias: RegisterUserInputModel[]
    title?: string
    bio?: string
    cityState?: {
      uf: string
      city?: string
      lifeInBrazil: boolean
    }
  }
}

@Injectable()
export class UserService {
  constructor (
    private readonly userRepository: UserRepository,
    private readonly ibgeService: IbgeService,
    private readonly cityStateRepository: CityStateRepository,
    private readonly rpgStyleRepository: RpgStylesRepository,
    private readonly socialMediaRepository: SocialMediaRepository,
    private readonly playerProfile: PlayersProfileRepository
  ) {}

  async checkUsernameIsAvailable (username: string): Promise<void> {
    const filter = new Filter()
    const result = filter.isProfane(username)
    if (result) {
      throw new AppException('Username with bad words')
    }

    const user = await this.userRepository.findByUsername(username)
    if (user) {
      throw new AppException('Username already exists')
    }

    await Promise.resolve()
  }

  async registerUser ({ id, user }: InputUserService, session: any): Promise<void> {
    const {
      name,
      title,
      dateOfBirth,
      playerProfileId,
      pronoun,
      rpgStyles,
      username,
      bio,
      cityState,
      socialMedias
    } = user

    const cityStateValue = cityState

    let savedCity: CityStateModel | undefined

    if (!session?.getCityValidationDone && cityStateValue) {
      const { cityFounded } = await this.ibgeService.findCitiesByState({ city: cityStateValue.city, uf: cityStateValue.uf })
      if (!cityFounded) throw new AppException('City not found')
      const city = cityStateValue.city ?? ''
      savedCity = await this.cityStateRepository.save({
        city,
        uf: cityStateValue.uf,
        lifeInBrazil: cityStateValue.lifeInBrazil
      })
    }

    const playerProfile = await this.playerProfile.findById(playerProfileId)
    if (!playerProfile) {
      throw new AppException(`Player Profile with id: ${playerProfileId} not found`)
    }

    for (const rpgStyle of rpgStyles) {
      const result = await this.rpgStyleRepository.findById(rpgStyle)
      if (!result) {
        throw new AppException(`Rgp Style with id: ${rpgStyle} not found`)
      }
    }

    if (socialMedias) {
      for (const socialMedia of socialMedias) {
        const result = await this.socialMediaRepository.findById(socialMedia.socialMediaId)
        if (!result) {
          throw new AppException(`Social media with id: ${socialMedia.socialMediaId} not found`)
        }
      }
    }

    await this.userRepository.register({
      id,
      name,
      username,
      pronoun,
      dateOfBirth,
      title,
      bio,
      playerProfileId,
      cityStateId: savedCity?.id,
      rpgStyles,
      socialMedias
    })
  }
}
