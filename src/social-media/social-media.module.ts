import { PrismaService } from '@/shared/prisma/prisma.service'
import { Module } from '@nestjs/common'
import { SocialMediaRepository } from './repository/social-media-repository'
import { SocialMediaController } from './social-media.controller'
import { SocialMediaService } from './social-media.service'

@Module({
  controllers: [SocialMediaController],
  providers: [SocialMediaService, SocialMediaRepository, PrismaService]
})
export class SocialMediaModule {}
