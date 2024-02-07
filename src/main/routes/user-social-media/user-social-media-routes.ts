import { adaptRoute } from '@/main/factories/adapters'
import { makeSaveUserSocialMediaController } from '@/main/factories/controllers/user-social-media/save-user-social-media-controller-factory'
import { Controller, Post, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'

@Controller('/user/social-media')
export class UserSocialMediaRoutes {
  @Post()
  async saveUserSocialMedia (@Req() req: Request, @Res() res: Response): Promise<void> {
    const adaptNest = adaptRoute(makeSaveUserSocialMediaController())
    await adaptNest.adapt(req, res)
  }
}
