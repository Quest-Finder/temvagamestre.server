import { adaptRoute } from '@/factories/adapters/nest-route-adapter-factory'
import { makeSignUpWithClerkController } from '@/factories/controllers/user/signup-controller-factory'
import { makeAdaptClerkRequestSignUpControllerDecorator } from '@/factories/decorators'
import { Controller, Post, Req, Res } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { Request, Response } from 'express'

@ApiTags('SignUp-Clerk')
@Controller('/user/signup')
export class SignUpRoutes {
  @Post('/webhook')
  @ApiOperation({
    summary: 'Cria um usuário',
    description: 'Cria um novo usuário a partir de uma requisição feita pelo Clerk'
  })
  async signUpWebhook (@Req() req: Request, @Res() res: Response): Promise<void> {
    const adaptNest = adaptRoute(
      makeAdaptClerkRequestSignUpControllerDecorator(
        makeSignUpWithClerkController()
      )
    )
    await adaptNest.adapt(req, res)
  }
}
