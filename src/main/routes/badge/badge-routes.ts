import { adaptRoute } from '@/main/factories/adapters'
import { makeFindAllBadgesController } from '@/main/factories/controllers/badge/find-all-badges-controller-factory'
import { Controller, Get, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'

@Controller('/badge')
export class BadgeRoutesController {
  @Get()
  async getAllBadges (@Req() req: Request, @Res() res: Response): Promise<void> {
    const adaptNest = adaptRoute(makeFindAllBadgesController())
    await adaptNest.adapt(req, res)
  }
}
