import { adaptRoute } from '@/main/factories/adapters'
import { makeUpdateUserSocialMediaController } from '@/main/factories/controllers/user/update-user-social-media-factory'
import { Controller, Post, Req, Res } from '@nestjs/common'
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
}
