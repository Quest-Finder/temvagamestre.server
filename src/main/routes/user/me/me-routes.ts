import { adaptRoute } from '@/main/factories/adapters'
import { makeMeController } from '@/main/factories/controllers/user/me-controller-factory'
import { Controller, Get, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'

@Controller('/user/me')
export class MeRoutes {
  @Get()
  async me (@Req() req: Request, @Res() res: Response): Promise<void> {
    const adaptNest = adaptRoute(makeMeController())
    await adaptNest.adapt(req, res)
  }
}
