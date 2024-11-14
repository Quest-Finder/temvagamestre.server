import { PrismaService } from '@/shared/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { v4 } from 'uuid'
import { type UserModel } from '../entity/user.model'

export type UserInputRepository = {
  name: string
  email: string
  username?: string | null
  pronoun?: string | null
  dateOfBirth?: Date | null
  addressId?: string | null
  playerProfileId?: string | null
  externalAuthId?: string | null
}

export type UserRegisterRepositoryInput = {
  id: string
  name: string
  username?: string
  pronoun?: string
  addressId?: string
  dateOfBirth?: Date
  title?: string
  bio?: string
  playerProfileId?: string
  cityStateId?: string
  externalAuthId?: string
  rpgStyles: string[]
  socialMedias: Array<{
    socialMediaId: string
    userLink: string
  }>
}

@Injectable()
export class UserRepository {
  constructor (private readonly prismaService: PrismaService) { }

  async findById (id: string): Promise<UserModel | undefined> {
    const user = await this.prismaService.user.findUnique({ where: { id } })
    return user ?? undefined
  }

  async findByEmail (email: string): Promise<UserModel | undefined> {
    const user = await this.prismaService.user.findUnique({ where: { email } })
    return user ?? undefined
  }

  async findByExternalAuthId (externalAuthId: string): Promise<UserModel | undefined> {
    const user = await this.prismaService.user.findUnique({ where: { externalAuthId } })
    return user ?? undefined
  }

  async findByUsername (username: string): Promise<UserModel | undefined> {
    const user = await this.prismaService.user.findFirst({ where: { username } })
    return user ?? undefined
  }

  async createUser (data: UserInputRepository): Promise<UserModel> {
    const id = v4()
    const user = await this.prismaService.user.create({
      data: {
        id,
        ...data
      }
    })
    return user
  }

  async register ({ id, rpgStyles, socialMedias, ...rest }: UserRegisterRepositoryInput): Promise<UserModel> {
    return await this.prismaService.user.update({
      where: {
        id
      },
      data: {
        ...rest,
        userPreference: {
          create: {
            activeType: 'player',
            userPreferenceRpgStyle: { createMany: { data: rpgStyles.map(rpgStyleId => ({ rpgStyleId })) } }
          }
        },
        userSocialMedia: {
          createMany: {
            data: socialMedias.map(item => ({ link: item.userLink, socialMediaId: item.socialMediaId }))
          }
        }
      }
    })
  }
}
