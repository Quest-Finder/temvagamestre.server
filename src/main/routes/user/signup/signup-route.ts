import { adaptRoute } from '@/main/factories/adapters/nest-route-adapter-factory'
import { makeSignUpController } from '@/main/factories/controllers/user/signup/signup-controller-factory'
import { makeAdaptClerkRequestSignUpControllerDecorator } from '@/main/factories/decorators'
import { Controller, Post, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'

@Controller('/signup')
export class SignUpRoute {
  @Post('/webhook')
  async signUpWebhook (@Req() req: Request, @Res() res: Response): Promise<void> {
    const adaptNest = adaptRoute(
      makeAdaptClerkRequestSignUpControllerDecorator(
        makeSignUpController()
      )
    )
    await adaptNest.adapt(req, res)
  }
}
