import { adaptRoute } from '@/main/factories/adapters'
import { makeFindManySocialMediasController } from '@/main/factories/controllers/social-media/find-many-social-medias/find-many-social-medias-controller-factory'
import { Controller, Get, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'

@Controller('/social-media')
export class SocialMediaRoute {
  @Get()
  async findManySocialMedias (@Req() req: Request, @Res() res: Response): Promise<void> {
    const adaptNest = adaptRoute(
      makeFindManySocialMediasController()
    )

    await adaptNest.adapt(req, res)
  }
}
