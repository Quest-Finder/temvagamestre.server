import { adaptRoute } from '@/main/factories/adapters'
import { makeCountyStateController } from '@/main/factories/controllers/county-state/county-state-controller-factory'
import { Controller, Post, Req, Res } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { CountyStateRoutesDto } from './dtos/county-state-dto'

@ApiTags('County-state')
@Controller('/county-state')
export class CountyStateRoutes {
  @Post('/validate')
  @ApiOperation({
    description: 'Valida se existe o estado e municipio informados'
  })
  @ApiBody({ type: CountyStateRoutesDto })
  @ApiResponse({ status: 204, description: 'Sucesso: O estado e os municipios foram encontrados e o municipio informado corresponde ao estado informado' })
  @ApiResponse({ status: 400, description: 'Bad Request: Requisição inválida' })
  @ApiResponse({ status: 500, description: 'Internal Server Error: Erro interno do servidor' })
  async validateCountyState (@Req() req: Request, @Res() res: Response): Promise<void> {
    const adaptNest = adaptRoute(makeCountyStateController())
    await adaptNest.adapt(req, res)
  }
}
