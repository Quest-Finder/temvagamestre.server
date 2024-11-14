import { PrismaService } from '@/shared/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { type UserPreferenceGamePlaceModel } from '../entity/user-preference-game-place.model'

@Injectable()
export class UserPreferenceGamePlaceRepository {
  constructor (
    private readonly prismaService: PrismaService
  ) {}

  async save ({ id, inPerson, online }: UserPreferenceGamePlaceModel): Promise<UserPreferenceGamePlaceModel > {
    const result = await this.prismaService.userPreferenceGamePlace.upsert({
      where: {
        id
      },
      update: { inPerson, online },
      create: {
        id, inPerson, online
      }
    })
    return result
  }
}
