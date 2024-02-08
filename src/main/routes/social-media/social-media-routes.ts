import { adaptRoute } from '@/main/factories/adapters'
import { makeFindManySocialMediasController } from '@/main/factories/controllers/social-media/find-many-social-medias/find-many-social-medias-controller-factory'
import { Controller, Get, Req, Res } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'

@ApiTags('Social-Media')
@Controller('/social-media')
export class SocialMediaRoutes {
  @Get()
  @ApiOperation({
    summary: 'Busca todas as redes sociais',
    description: 'Busca todas as redes sociais pré-cadastradas'
  })
  async findManySocialMedias (@Req() req: Request, @Res() res: Response): Promise<void> {
    const adaptNest = adaptRoute(makeFindManySocialMediasController())
    await adaptNest.adapt(req, res)
  }
}
