import { adaptRoute } from '@/main/factories/adapters'
import { makeAddUserPreferenceController } from '@/main/factories/controllers/user/add-user-preference-controller-factory'
import { makeUpdateUserPreferenceController } from '@/main/factories/controllers/user/update-user-preference-controller-factory'
import { makeUpdateUserController } from '@/main/factories/controllers/user/update-user-controller-factory'
import { Controller, Patch, Post, Req, Res, Put } from '@nestjs/common'
import { Request, Response } from 'express'
import { makeAddGamePlaceController } from '@/main/factories/controllers/user/add-game-place-controller-factory'
import { makeAddDayPeriodController } from '@/main/factories/controllers/user/add-day-period-controller-factory'
import { makeSaveUserSocialMediaController } from '@/main/factories/controllers/user-social-media/save-user-social-media-controller-factory'

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
    const adaptNest = adaptRoute(makeAddDayPeriodController())
    await adaptNest.adapt(req, res)
  }

  @Post('/preference/game-place')
  async addGamePlace (@Req() req: Request, @Res() res: Response): Promise<void> {
    const adaptNest = adaptRoute(makeAddGamePlaceController())
    await adaptNest.adapt(req, res)
  }
}
