import { PrismaService } from '@/shared/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { type SocialMediaModel } from './entities/social-media.model'

@Injectable()
export class SocialMediaRepository {
  constructor (private readonly prismaService: PrismaService) {}

  async findAll (): Promise<SocialMediaModel[]> {
    return await this.prismaService.socialMedia.findMany()
  }

  async findById (id: string): Promise<SocialMediaModel | undefined> {
    const socialMedia = await this.prismaService.socialMedia.findUnique({
      where: {
        id
      }
    })
    return socialMedia ?? undefined
  }
}
