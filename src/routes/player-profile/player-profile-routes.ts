import { adaptRoute } from '@/factories/adapters'
import { makeFindAllPlayerProfileController } from '@/factories/controllers/player-profile/find-all-player-profile-controller-factory'
import { Controller, Get, Req, Res } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { PlayerProfileDTO } from './dtos/player-profile-dto'

@ApiTags('Player-Profile')
@Controller('/player-profile')
export class PlayerProfileRoutes {
  @Get()
  @ApiOperation({
    summary: 'Busca todos os Perfis de Jogador',
    description: 'Busca todos os Perfis de Jogador pré-cadastrados'
  })
  @ApiResponse({
    status: 200,
    description: 'Sucesso: Retorna lista dos perfis de jogar',
    type: PlayerProfileDTO,
    isArray: true
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error: Erro interno do servidor' })
  async findManyRpgStyles (@Req() req: Request, @Res() res: Response): Promise<void> {
    const adaptNest = adaptRoute(makeFindAllPlayerProfileController())
    await adaptNest.adapt(req, res)
  }
}
