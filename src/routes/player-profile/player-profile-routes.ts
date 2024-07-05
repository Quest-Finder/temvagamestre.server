import { adaptRoute } from '@/factories/adapters'
import { makeFindAllPlayerProfileController } from '@/factories/controllers/player-profile/find-all-player-profile-controller-factory'
import { Controller, Get, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'

@Controller('/players-profile')
export class PlayerProfileRoutes {
  @Get()

  async findManyRpgStyles (@Req() req: Request, @Res() res: Response): Promise<void> {
    const adaptNest = adaptRoute(makeFindAllPlayerProfileController())
    await adaptNest.adapt(req, res)
  }
}
