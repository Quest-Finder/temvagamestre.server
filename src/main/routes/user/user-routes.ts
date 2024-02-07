import { adaptRoute } from '@/main/factories/adapters'
import { makeUpdateUserController } from '@/main/factories/controllers/user/update-user-controller-factory'
import { Controller, Patch, Req, Res } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { UpdateUserRoutesDto } from './user-routes-dtos/update-user-routes-dto'

@ApiTags('User')
@Controller('/user')
export class UserRoutes {
  @Patch()
  @ApiOperation({
    summary: 'Atualiza um usuário',
    description: 'Atualiza informações referente ao próprio usuário logado'
  })
  @ApiBearerAuth()
  @ApiBody({ type: UpdateUserRoutesDto })
  @ApiResponse({ status: 204, description: 'Sucesso: Usuário atualizado' })
  @ApiResponse({ status: 400, description: 'Bad Request: Requisição inválida' })
  @ApiResponse({ status: 401, description: 'Unauthorized: Não autorizado' })
  @ApiResponse({ status: 500, description: 'Internal Server Error: Erro interno do servidor' })
  async updateUser (@Req() req: Request, @Res() res: Response): Promise<void> {
    const adaptNest = adaptRoute(makeUpdateUserController())
    await adaptNest.adapt(req, res)
  }
}
