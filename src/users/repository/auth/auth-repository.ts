import { PrismaService } from '@/shared/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { v4 } from 'uuid'
import { type AuthModel } from '../entity/auth.model'

export type AuthData = Omit<AuthModel, 'id' | 'onboarding'>

@Injectable()
export class AuthRepository {
  constructor (private readonly prismaService: PrismaService) { }

  async findByEmail (email: string): Promise<AuthModel | undefined> {
    const result = await this.prismaService.auth.findUnique({
      where: {
        email
      }
    })
    return result ?? undefined
  }

  async save (data: AuthData): Promise<AuthModel> {
    const result = await this.prismaService.auth.create({
      data: {
        id: v4(),
        ...data
      }
    })
    return result
  }
}
