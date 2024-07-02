import { adaptRoute } from '@/factories/adapters'
import { makeCheckUsernameController } from '@/factories/controllers/user/check-username-controller-factory'
import { makeRegisterUserController } from '@/factories/controllers/user/register-user-controller-factory'
import { Controller, Get, Post, Req, Res } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
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

  @Get('/check-username/:username')
  @ApiOperation({
    summary: 'Verifica username do usuario',
    description: 'Verificar se o username do usuario e valido ou exite'
  })
  @ApiParam({
    type: 'string',
    name: 'username',
    required: true
  })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Sucesso: Username esta disponivel' })
  @ApiResponse({ status: 400, description: 'Bad Request: Requisição inválida, username sendo utilizado' })
  @ApiResponse({ status: 401, description: 'Unauthorized: Não autorizado' })
  @ApiResponse({ status: 404, description: 'Not Found: Username não foi encontrado' })
  @ApiResponse({ status: 500, description: 'Internal Server Error: Erro interno do servidor' })
  async checkUserName (@Req() req: Request, @Res() res: Response): Promise<void> {
    const adaptNest = adaptRoute(makeCheckUsernameController())
    await adaptNest.adapt(req, res)
  }
}
