import { PrismaService } from '@/shared/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { v4 } from 'uuid'
import { type UserWithEmailModel } from '../entity/user-with-email.model'

export type UserWithEmailData = Omit<UserWithEmailModel, 'id'>

@Injectable()
export class UserWithEmailRepository {
  constructor (private readonly prismaService: PrismaService) { }

  async findByEmail (email: string): Promise<UserWithEmailModel | undefined> {
    const result = await this.prismaService.userWithEmail.findUnique({
      where: {
        email
      }
    })
    return result ?? undefined
  }

  async save (data: UserWithEmailData): Promise<UserWithEmailModel> {
    const result = await this.prismaService.userWithEmail.create({
      data: {
        id: v4(),
        ...data
      }
    })
    return result
  }
}
