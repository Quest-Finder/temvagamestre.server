import { Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { type RpgStyleDto } from './dto/rpg-style-dto'
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
  async findAll (): Promise<RpgStyleDto[]> {
    return await this.rpgStylesService.findAll()
  }
}
