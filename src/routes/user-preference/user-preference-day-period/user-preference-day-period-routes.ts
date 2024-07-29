import { adaptRoute } from '@/factories/adapters'
import { makeSaveUserPreferenceDayPeriodController } from '@/factories/controllers/user-preference-day-period/save-user-preference-day-period-controller-factory'
import { Controller, Post, Req, Res } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { SaveUserPreferenceDayPeriodRoutesDto } from './dtos'

@ApiTags('User-Preference')
@Controller('/user/preference/day-period')
export class UserPreferenceDayPeriodRoutes {
  @Post()
  @ApiOperation({
    summary: 'Salva períodos do dia para o usuário',
    description: 'Adiciona períodos do dia preferidos para o usuário logado caso ele não tenha um salvo, e atualiza caso ele possua algum cadastrado'
  })
  @ApiBearerAuth()
  @ApiBody({ type: SaveUserPreferenceDayPeriodRoutesDto })
  @ApiResponse({ status: 204, description: 'Sucesso: Usuário atualizado' })
  @ApiResponse({ status: 400, description: 'Bad Request: Requisição inválida' })
  @ApiResponse({ status: 401, description: 'Unauthorized: Não autorizado' })
  @ApiResponse({ status: 500, description: 'Internal Server Error: Erro interno do servidor' })
  async saveDayPeriod (@Req() req: Request, @Res() res: Response): Promise<void> {
    const adaptNest = adaptRoute(makeSaveUserPreferenceDayPeriodController())
    await adaptNest.adapt(req, res)
  }
}
