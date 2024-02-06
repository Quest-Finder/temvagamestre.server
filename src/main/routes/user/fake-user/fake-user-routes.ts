import { adaptRoute } from '@/main/factories/adapters'
import { makeAddFakeUserController } from '@/main/factories/controllers/user/add-fake-user-controller-factory'
import { Controller, Get, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'

@Controller('/fake-user')
export class FakeUserRoutes {
  @Get('/generate-token')
  async addFakeUser (@Req() req: Request, @Res() res: Response): Promise<void> {
    const adaptNest = adaptRoute(makeAddFakeUserController())
    await adaptNest.adapt(req, res)
  }
}
