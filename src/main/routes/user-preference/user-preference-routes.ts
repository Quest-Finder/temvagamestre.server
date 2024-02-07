import { adaptRoute } from '@/main/factories/adapters'
import { makeAddUserPreferenceController } from '@/main/factories/controllers/user-preference/add-user-preference-controller-factory'
import { makeUpdateUserPreferenceController } from '@/main/factories/controllers/user-preference/update-user-preference-controller-factory'
import { Controller, Patch, Post, Req, Res } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { AddUserPreferenceRoutesDto, UpdateUserPreferenceRoutesDto } from './dtos'

@ApiTags('User-Preference')
@Controller('/user/preference')
export class UserPreferenceRoutes {
  @Post()
  @ApiOperation({
    summary: 'Adiciona preferências para o usuário',
    description: 'Adiciona preferências para usuário logado'
  })
  @ApiBearerAuth()
  @ApiBody({ type: AddUserPreferenceRoutesDto })
  @ApiResponse({ status: 204, description: 'Sucesso: Preferência do usuário adicionada' })
  @ApiResponse({ status: 400, description: 'Bad Request: Requisição inválida' })
  @ApiResponse({ status: 401, description: 'Unauthorized: Não autorizado' })
  @ApiResponse({ status: 500, description: 'Internal Server Error: Erro interno do servidor' })
  async addUserPreference (@Req() req: Request, @Res() res: Response): Promise<void> {
    const adaptNest = adaptRoute(makeAddUserPreferenceController())
    await adaptNest.adapt(req, res)
  }

  @Patch()
  @ApiOperation({
    summary: 'Atualiza preferências para o usuário',
    description: 'Atualiza preferências para usuário logado'
  })
  @ApiBearerAuth()
  @ApiBody({ type: UpdateUserPreferenceRoutesDto })
  @ApiResponse({ status: 204, description: 'Sucesso: Preferência do usuário atualizada' })
  @ApiResponse({ status: 400, description: 'Bad Request: Requisição inválida' })
  @ApiResponse({ status: 401, description: 'Unauthorized: Não autorizado' })
  @ApiResponse({ status: 500, description: 'Internal Server Error: Erro interno do servidor' })
  async updateUserPreference (@Req() req: Request, @Res() res: Response): Promise<void> {
    const adaptNest = adaptRoute(makeUpdateUserPreferenceController())
    await adaptNest.adapt(req, res)
  }
}
