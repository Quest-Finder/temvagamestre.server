import { PrismaService } from '@/shared/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { type UserPreferenceModel } from '../entity/user-preference.model'

@Injectable()
export class UserPreferenceRepository {
  constructor (private readonly prismaService: PrismaService) {}

  async save (userPreference: UserPreferenceModel): Promise<UserPreferenceModel | undefined> {
    const result = await this.prismaService.userPreference.create({
      data: userPreference
    })
    return result ?? undefined
  }

  async findById (id: string): Promise<UserPreferenceModel | undefined> {
    const result = await this.prismaService.userPreference.findUnique({
      where: {
        id
      }
    })
    return result ?? undefined
  }

  async update ({ id, activeType, frequency }: UserPreferenceModel): Promise<UserPreferenceModel> {
    const result = await this.prismaService.userPreference.update({
      where: {
        id
      },
      data: {
        activeType,
        frequency
      }
    })
    return result
  }
}
