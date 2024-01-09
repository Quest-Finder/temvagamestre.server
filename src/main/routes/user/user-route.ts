import { adaptRoute } from '@/main/factories/adapters'
import { makeUpdateUserPreferenceController } from '@/main/factories/controllers/user/update-user-preference-controller-factory'
import { makeUpdateUserSocialMediaController } from '@/main/factories/controllers/user/update-user-social-media-controller-factory'
import { Controller, Post, Put, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'

@Controller('/user')
export class UserRoute {
  @Post('/social-media')
  async updateSocialMedia (@Req() req: Request, @Res() res: Response): Promise<void> {
    const adaptNest = adaptRoute(
      makeUpdateUserSocialMediaController()
    )
    await adaptNest.adapt(req, res)
  }

  @Put('/preference')
  async updateUserPreference (@Req() req: Request, @Res() res: Response): Promise<void> {
    const adaptNest = adaptRoute(
      makeUpdateUserPreferenceController()
    )
    await adaptNest.adapt(req, res)
  }
}
