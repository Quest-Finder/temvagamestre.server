import { ZodValidationPipePipe } from '@/shared/zod-validation-pipe/zod-validation-pipe.pipe'
import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CityStateService } from '../city-state.service'
import { CreateCityStateDto, createCityStateSchema } from './dto/create-city-state.dto'

@ApiTags('City-State')
@Controller('/city-state')
export class CityStateController {
  constructor (private readonly cityStateService: CityStateService) {}
  // todo: this feature should be a get like: city?state=AC
  @Post()
  @ApiOperation({
    description: 'Busca os municípios do estado informado.'
  })
  @ApiResponse({ status: 200, description: 'Sucesso: retorna todos os municípios do estado solicitado' })
  @ApiResponse({ status: 400, description: 'Bad Request: Requisição inválida' })
  @ApiResponse({ status: 500, description: 'Internal Server Error: Erro interno do servidor' })
  @HttpCode(200)
  async create (@Body(new ZodValidationPipePipe(createCityStateSchema)) { uf, city }: CreateCityStateDto): Promise<unknown> {
    return await this.cityStateService.create({ uf, city })
  }
}
