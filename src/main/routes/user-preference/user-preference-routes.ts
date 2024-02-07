import { adaptRoute } from '@/main/factories/adapters'
import { makeAddUserPreferenceController } from '@/main/factories/controllers/user-preference/add-user-preference-controller-factory'
import { makeUpdateUserPreferenceController } from '@/main/factories/controllers/user-preference/update-user-preference-controller-factory'
import { Controller, Patch, Post, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'

@Controller('/user/preference')
export class UserPreferenceRoutes {
  @Post()
  async addUserPreference (@Req() req: Request, @Res() res: Response): Promise<void> {
    const adaptNest = adaptRoute(makeAddUserPreferenceController())
    await adaptNest.adapt(req, res)
  }

  @Patch()
  async updateUserPreference (@Req() req: Request, @Res() res: Response): Promise<void> {
    const adaptNest = adaptRoute(makeUpdateUserPreferenceController())
    await adaptNest.adapt(req, res)
  }
}
