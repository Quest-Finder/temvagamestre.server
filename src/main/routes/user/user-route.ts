import { adaptRoute } from '@/main/factories/adapters'
import { makeUpdateUserController } from '@/main/factories/controllers/user/update-user-controller-factory'
import { makeUpdateUserSocialMediaController } from '@/main/factories/controllers/user/update-user-social-media-factory'
import { Controller, Patch, Post, Req, Res } from '@nestjs/common'
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

  @Patch()
  async updateUser (@Req() req: Request, @Res() res: Response): Promise<void> {
    const adaptNest = adaptRoute(makeUpdateUserController())
    await adaptNest.adapt(req, res)
  }
}
