import { adaptRoute } from '@/main/factories/adapters'
import { makeCityStateController } from '@/main/factories/controllers/city-state/city-state-controller-factory'
import { Controller, Post, Req, Res } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { CityStateRoutesDto } from './dtos/county-state-dto'

@ApiTags('City-state')
@Controller('/city-state')
export class CityStateRoutes {
  @Post()
  @ApiOperation({
    description: 'Busca os municipios do estado informado.'
  })
  @ApiBody({ type: CityStateRoutesDto })
  @ApiResponse({ status: 200, description: 'Sucesso: retorna todos os municipios do estado solicitado' })
  @ApiResponse({ status: 400, description: 'Bad Request: Requisição inválida' })
  @ApiResponse({ status: 500, description: 'Internal Server Error: Erro interno do servidor' })
  async validateCityState (@Req() req: Request, @Res() res: Response): Promise<void> {
    const adaptNest = adaptRoute(makeCityStateController())
    await adaptNest.adapt(req, res)
  }
}
