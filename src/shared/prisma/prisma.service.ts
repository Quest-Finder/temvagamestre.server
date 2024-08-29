import { PrismaClient } from '@/infra/database/prisma/client'
import { Injectable, type OnModuleInit } from '@nestjs/common'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async onModuleInit () {
    await this.$connect()
  }
}
