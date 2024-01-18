import { type AddDayPeriodData } from '@/domain/contracts/user/add-day-period'
import { type AddOrUpdateDayPeriodRepo } from '@/usecases/contracts/db/user/add-or-update-day-period-repo'
import { PrismaHelper } from '../../helpers/prisma-helper'

export class AddOrUpdateDayPeriodPrismaRepo implements AddOrUpdateDayPeriodRepo {
  async execute (data: AddDayPeriodData): Promise<void> {
    const { id, morning, afternoon, night } = data
    const prisma = await PrismaHelper.getPrisma()

    await prisma.dayPeriod.upsert({
      where: {
        id
      },
      update: {
        morning,
        afternoon,
        night
      },
      create: data
    })
  }
}
