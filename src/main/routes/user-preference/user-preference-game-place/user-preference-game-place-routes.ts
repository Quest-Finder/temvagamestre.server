import { adaptRoute } from '@/main/factories/adapters'
import { makeSaveUserPreferenceGamePlaceController } from '@/main/factories/controllers/user-preference-game-place/save-user-preference-game-place-controller-factory'
import { Controller, Post, Req, Res } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'

@ApiTags('User-Preference')
@Controller('/user/preference/game-place')
export class UserPreferenceGamePlaceRoutes {
  @Post()
  async addGamePlace (@Req() req: Request, @Res() res: Response): Promise<void> {
    const adaptNest = adaptRoute(makeSaveUserPreferenceGamePlaceController())
    await adaptNest.adapt(req, res)
  }
}
