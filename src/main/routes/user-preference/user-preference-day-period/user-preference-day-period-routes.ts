import { adaptRoute } from '@/main/factories/adapters'
import { makeSaveUserPreferenceDayPeriodController } from '@/main/factories/controllers/user-preference-day-period/save-user-preference-day-period-controller-factory'
import { Controller, Post, Req, Res } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'

@ApiTags('User-Preference')
@Controller('/user/preference/day-period')
export class UserPreferenceDayPeriodRoutes {
  @Post()
  async addDayPeriod (@Req() req: Request, @Res() res: Response): Promise<void> {
    const adaptNest = adaptRoute(makeSaveUserPreferenceDayPeriodController())
    await adaptNest.adapt(req, res)
  }
}
