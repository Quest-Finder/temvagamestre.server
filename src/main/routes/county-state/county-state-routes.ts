import { adaptRoute } from '@/main/factories/adapters'
import { makeCountyStateController } from '@/main/factories/controllers/county-state/county-state-controller-factory'
import { Controller, Post, Req, Res } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'

@ApiTags('County-state')
@Controller('/county-state')
export class CountyStateRoutes {
  @Post('/validate')
  @ApiOperation({
    description: 'Valida se existe o estado e municipio informados'
  })
  async validateCountyState (@Req() req: Request, @Res() res: Response): Promise<void> {
    const adaptNest = adaptRoute(makeCountyStateController())
    await adaptNest.adapt(req, res)
  }
}
