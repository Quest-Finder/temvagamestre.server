import { Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { PlayerProfileDTO } from './dto/players-profile.dto'
import { PlayerProfileService } from './player-profile.service'

@ApiTags('Player-Profile')
@Controller('player-profile')
export class PlayerProfileController {
  constructor (private readonly playerProfileService: PlayerProfileService) {}

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
  async findAll (): Promise<PlayerProfileDTO[]> {
    return await this.playerProfileService.findAll()
  }
}
