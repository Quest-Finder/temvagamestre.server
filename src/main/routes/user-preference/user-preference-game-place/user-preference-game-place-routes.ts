import { adaptRoute } from '@/main/factories/adapters'
import { makeSaveUserPreferenceGamePlaceController } from '@/main/factories/controllers/user-preference-game-place/save-user-preference-game-place-controller-factory'
import { Controller, Post, Req, Res } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { SaveUserPreferenceGamePlaceRoutesDto } from './dtos'

@ApiTags('User-Preference')
@Controller('/user/preference/game-place')
export class UserPreferenceGamePlaceRoutes {
  @Post()
  @ApiOperation({
    summary: 'Salva um local de jogo para o usuário',
    description: 'Adiciona um local de jogo preferido para o usuário logado caso ele não tenha um, e atualiza caso ele possua algum cadastrado'
  })
  @ApiBearerAuth()
  @ApiBody({ type: SaveUserPreferenceGamePlaceRoutesDto })
  @ApiResponse({ status: 204, description: 'Sucesso: Preferência do usuário atualizada' })
  @ApiResponse({ status: 400, description: 'Bad Request: Requisição inválida' })
  @ApiResponse({ status: 401, description: 'Unauthorized: Não autorizado' })
  @ApiResponse({ status: 500, description: 'Internal Server Error: Erro interno do servidor' })
  async saveGamePlace (@Req() req: Request, @Res() res: Response): Promise<void> {
    const adaptNest = adaptRoute(makeSaveUserPreferenceGamePlaceController())
    await adaptNest.adapt(req, res)
  }
}
