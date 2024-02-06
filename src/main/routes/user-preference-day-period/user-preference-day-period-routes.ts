import { adaptRoute } from '@/main/factories/adapters'
import { makeSaveUserPreferenceDayPeriodController } from '@/main/factories/controllers/user-preference-day-period/save-user-preference-day-period-controller-factory'
import { Controller, Post, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'

@Controller('/user')
export class UserPreferenceDayPeriodRoutes {
  @Post('/preference/day-period')
  async addDayPeriod (@Req() req: Request, @Res() res: Response): Promise<void> {
    const adaptNest = adaptRoute(makeSaveUserPreferenceDayPeriodController())
    await adaptNest.adapt(req, res)
  }
}
