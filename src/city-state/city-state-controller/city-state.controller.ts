import { ErrorDetail, ErrorDetailField } from '@/shared/dtos/error-details.dto'
import { ZodValidationPipePipe } from '@/shared/zod-validation-pipe/zod-validation-pipe.pipe'
import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CityStateService } from '../city-state.service'
import { CreateCityStateDto, InputCityState, createCityStateSchema } from './dto/create-city-state.dto'

@ApiTags('City-State')
@Controller('/city-state')
export class CityStateController {
  constructor (private readonly cityStateService: CityStateService) {}
  // TODO: this feature should be a get like: city?state=AC
  @Post()
  @ApiOperation({
    description: 'Busca os municípios do estado informado.'
  })
  @ApiBody({ type: InputCityState })
  @ApiResponse({
    status: 200,
    description: 'Sucesso: retorna todos os municípios do estado solicitado',
    isArray: true,
    schema: { example: ['Rio das ostras', 'Rio de janeiro', 'Búzios', 'Arrail do CAbo'], type: 'string[]' }
  })
  @ApiResponse({ status: 400, description: 'Bad Request: Requisição inválida', type: ErrorDetailField })
  @ApiResponse({ status: 500, description: 'Internal Server Error: Erro interno do servidor', type: ErrorDetail })
  @HttpCode(200)
  async create (@Body(new ZodValidationPipePipe(createCityStateSchema)) { uf, city }: CreateCityStateDto): Promise<unknown> {
    return await this.cityStateService.create({ uf, city })
  }
}
