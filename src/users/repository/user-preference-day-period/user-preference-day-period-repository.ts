import { PrismaService } from '@/shared/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { type UserPreferenceDayPeriodModel } from '../entity/user-preference-day-period.model'

@Injectable()
export class UserPreferenceDayPeriodRepository {
  constructor (
    private readonly prismaService: PrismaService
  ) {}

  async save (data: UserPreferenceDayPeriodModel): Promise<UserPreferenceDayPeriodModel | undefined> {
    const { id, morning, afternoon, night } = data
    const result = await this.prismaService.userPreferenceDayPeriod.upsert({
      where: { id },
      update: { morning, afternoon, night },
      create: data
    })
    return result ?? undefined
  }
}
