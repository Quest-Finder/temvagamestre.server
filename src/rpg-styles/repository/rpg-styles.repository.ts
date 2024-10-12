import { PrismaService } from '@/shared/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { type RpgStyleModel } from './entities/rpg-style.entity'

@Injectable()
export class RpgStylesRepository {
  constructor (private readonly prismaService: PrismaService) {}

  async findAll (): Promise<RpgStyleModel[]> {
    return await this.prismaService.rpgStyle.findMany()
  }

  async findById (id: string): Promise<RpgStyleModel | undefined> {
    const result = await this.prismaService.rpgStyle.findUnique({ where: { id } })
    return result ?? undefined
  }
}
