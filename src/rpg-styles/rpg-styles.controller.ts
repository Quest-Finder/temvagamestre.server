import { ErrorDetail } from '@/shared/dtos/error-details.dto'
import { Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { RpgStyleDto } from './dto/rpg-style-dto'
import { RpgStylesService } from './rpg-styles.service'

@ApiTags('Rpg-Style')
@Controller('/rpg-style')
export class RpgStylesController {
  constructor (private readonly rpgStylesService: RpgStylesService) {}

  @Get()
  @ApiOperation({
    summary: 'Busca todos os estilos de RPG',
    description: 'Busca todos os estilo de RPG pré-cadastrados'
  })
  @ApiResponse({
    status: 200,
    description: 'Sucesso: Retorna lista dos estilos de rpg',
    type: RpgStyleDto,
    isArray: true
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error: Erro interno do servidor',
    type: ErrorDetail
  })
  async findAll (): Promise<RpgStyleDto[]> {
    return await this.rpgStylesService.findAll()
  }
}
