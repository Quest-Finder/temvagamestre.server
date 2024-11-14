import env from '@/configs/env'
import { PrismaService } from '@/shared/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import jwt from 'jsonwebtoken'
import { v4 } from 'uuid'

export type FakeUserData = {
  token: string
  user: {
    id: string
    email: string
    name: string
  }
}

@Injectable()
export class FakeUserService {
  constructor (private readonly prismaService: PrismaService) {}

  async createFakeUser (): Promise<FakeUserData> {
    const id = v4()
    const value = Math.random().toString().substring(2, 6)
    const data = {
      id,
      email: `email_${value}@mail.com`,
      name: `last_name_${value} first_name_${value}`,
      externalAuthId: id
    }
    await this.prismaService.user.create({
      data
    })
    await this.prismaService.externalAuthMapping.create({
      data: {
        externalAuthUserId: id,
        userId: id
      }
    })
    const token = jwt.sign({ clerkUserId: id }, env.clerkJwtSecretKey, { expiresIn: '1h' })
    return {
      token, user: { id: data.id, name: data.name, email: data.email }
    }
  }
}
