import { adaptRoute } from '@/factories/adapters'
import { makeRegisterUserController } from '@/factories/controllers/user/register-user-controller-factory'
import { Controller, Post, Req, Res } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { RegisterUserRoutesDto } from './dtos/register-user-routes-dto'

@ApiTags('User')
@Controller('/user')
export class UserRoutes {
  @Post()
  @ApiOperation({
    summary: 'Cadastrar um usuário',
    description: 'Cadastra informações referente ao próprio usuário logado'
  })
  @ApiBearerAuth()
  @ApiBody({ type: RegisterUserRoutesDto })
  @ApiResponse({ status: 204, description: 'Sucesso: Usuário Cadastrado' })
  @ApiResponse({ status: 400, description: 'Bad Request: Requisição inválida' })
  @ApiResponse({ status: 401, description: 'Unauthorized: Não autorizado' })
  @ApiResponse({ status: 500, description: 'Internal Server Error: Erro interno do servidor' })
  async registerUser (@Req() req: Request, @Res() res: Response): Promise<void> {
    const adaptNest = adaptRoute(makeRegisterUserController())
    await adaptNest.adapt(req, res)
  }
}
