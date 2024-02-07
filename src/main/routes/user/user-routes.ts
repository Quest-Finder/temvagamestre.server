import { adaptRoute } from '@/main/factories/adapters'
import { makeUpdateUserController } from '@/main/factories/controllers/user/update-user-controller-factory'
import { Controller, Patch, Req, Res } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'

@ApiTags('User')
@Controller('/user')
export class UserRoutes {
  @Patch()
  async updateUser (@Req() req: Request, @Res() res: Response): Promise<void> {
    const adaptNest = adaptRoute(makeUpdateUserController())
    await adaptNest.adapt(req, res)
  }
}
