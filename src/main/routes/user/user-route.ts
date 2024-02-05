import { adaptRoute } from '@/main/factories/adapters'
import { makeSaveUserPreferenceDayPeriodController } from '@/main/factories/controllers/user-preference-day-period/save-user-preference-day-period-controller-factory'
import { makeSaveUserPreferenceGamePlaceController } from '@/main/factories/controllers/user-preference-game-place/save-user-preference-game-place-controller-factory'
import { makeSaveUserSocialMediaController } from '@/main/factories/controllers/user-social-media/save-user-social-media-controller-factory'
import { makeAddUserPreferenceController } from '@/main/factories/controllers/user/add-user-preference-controller-factory'
import { makeUpdateUserController } from '@/main/factories/controllers/user/update-user-controller-factory'
import { makeUpdateUserPreferenceController } from '@/main/factories/controllers/user/update-user-preference-controller-factory'
import { Controller, Patch, Post, Put, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'

@Controller('/user')
export class UserRoute {
  @Post('/social-media')
  async saveUserSocialMedia (@Req() req: Request, @Res() res: Response): Promise<void> {
    const adaptNest = adaptRoute(makeSaveUserSocialMediaController())
    await adaptNest.adapt(req, res)
  }

  @Post('/preference')
  async addUserPreference (@Req() req: Request, @Res() res: Response): Promise<void> {
    const adaptNest = adaptRoute(makeAddUserPreferenceController())
    await adaptNest.adapt(req, res)
  }

  @Put('/preference')
  async updateUserPreference (@Req() req: Request, @Res() res: Response): Promise<void> {
    const adaptNest = adaptRoute(makeUpdateUserPreferenceController())
    await adaptNest.adapt(req, res)
  }

  @Patch()
  async updateUser (@Req() req: Request, @Res() res: Response): Promise<void> {
    const adaptNest = adaptRoute(makeUpdateUserController())
    await adaptNest.adapt(req, res)
  }

  @Post('/preference/day-period')
  async addDayPeriod (@Req() req: Request, @Res() res: Response): Promise<void> {
    const adaptNest = adaptRoute(makeSaveUserPreferenceDayPeriodController())
    await adaptNest.adapt(req, res)
  }

  @Post('/preference/game-place')
  async addGamePlace (@Req() req: Request, @Res() res: Response): Promise<void> {
    const adaptNest = adaptRoute(makeSaveUserPreferenceGamePlaceController())
    await adaptNest.adapt(req, res)
  }
}
