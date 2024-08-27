import { adaptRoute } from '@/factories/adapters'
import { Controller, Post, Req, Res } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { SignUpWithEmailDto } from '../dtos/sign-up-with-email-dto'
import { SignUpWithEmailController } from '@/controllers/user/sign-up-with-email/sign-up-with-email-controller'
import { SignUpWithEmailZodValidation } from '@/validators/user/sign-up-with-email/sign-up-with-email-zod-validation'
import { SignUpWithEmailUseCase } from '@/usecases/implementations/user/sign-up-with-email/sign-up-with-email-usecase'
import { FindUserSignUpEmailRepo } from '../../../usecases/contracts/db/user/find-user-sign-up-email-repo'

@ApiTags('SignUp-With-Email')
@Controller('/user/signup')
export class SignUpWithEmailRoutes {
  @Post('/email')
  @ApiBody({ type: SignUpWithEmailDto })
  @ApiResponse({ status: 204, description: 'Sucesso: Usuário Cadastrado' })
  @ApiResponse({ status: 400, description: 'Bad Request: Requisição inválida' })
  @ApiResponse({ status: 401, description: 'Unauthorized: Não autorizado' })
  @ApiResponse({ status: 500, description: 'Internal Server Error: Erro interno do servidor' })
  @ApiOperation({
    summary: 'Cria um usuário',
    description: 'Cria um novo usuário a partir de email e senha'
  })
  async signUpWithEmail (@Req() req: Request, @Res() res: Response): Promise<void> {
    const validation = new SignUpWithEmailZodValidation()

    const adaptNest = adaptRoute(
      new SignUpWithEmailController(
        validation,
        SignUpWithEmailUseCase,
        FindUserSignUpEmailRepo()
      )
    )
    await adaptNest.adapt(req, res)
  }
}
