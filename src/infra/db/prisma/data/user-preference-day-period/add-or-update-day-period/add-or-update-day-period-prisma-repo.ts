import { type AddDayPeriodData } from '@/domain/contracts/user/add-day-period'
import { PrismaHelper } from '@/infra/db/prisma/helpers/prisma-helper'
import { type AddOrUpdateDayPeriodRepo } from '@/usecases/contracts/db/user'

export class AddOrUpdateDayPeriodPrismaRepo implements AddOrUpdateDayPeriodRepo {
  async execute (data: AddDayPeriodData): Promise<void> {
    const { id, morning, afternoon, night } = data
    const prisma = await PrismaHelper.getPrisma()
    await prisma.userPreferenceDayPeriod.upsert({
      where: { id },
      update: { morning, afternoon, night },
      create: data
    })
  }
}
