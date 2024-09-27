import { PrismaService } from '@/shared/prisma/prisma.service'
import { Module } from '@nestjs/common'
import { UserRepository } from './repository/user-repository'

@Module({
  providers: [UserRepository, PrismaService]

})
export class UsersModule {}
