import { adaptRoute } from '@/factories/adapters'
import { makeSignUpWithEmailController } from '@/factories/controllers/user/sign-up-with-email-controller-factory'
import { makeAdaptSignUpWithEmailControllerDecorator } from '@/factories/decorators/adapt-sign-up-with-email-controller-decorator-factory'
import { Controller, Post, Req, Res } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'

@ApiTags('SignUp-With-Email')
@Controller('/user/signup')
export class SignUpWithEmailRoutes {
  @Post('/email')
  @ApiOperation({
    summary: 'Cria um usuário',
    description: 'Cria um novo usuário a partir de email e senha'
  })
  async signUpWithEmail (@Req() req: Request, @Res() res: Response): Promise<void> {
    const adaptNest = adaptRoute(
      makeAdaptSignUpWithEmailControllerDecorator(
        makeSignUpWithEmailController()
      )
    )
    await adaptNest.adapt(req, res)
  }
}
