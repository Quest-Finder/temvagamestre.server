import { adaptRoute } from '@/factories/adapters'
import { makeAddFakeUserController } from '@/factories/controllers/user/add-fake-user-controller-factory'
import { Controller, Post, Req, Res } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { SignUpWithEmailDto } from '../../../users/sign-up/sign-up-with-email-dto'

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
    const adaptNest = adaptRoute(
      makeAddFakeUserController()
    )
    await adaptNest.adapt(req, res)
  }
}
