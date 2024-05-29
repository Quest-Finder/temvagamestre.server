import { adaptRoute } from '@/main/factories/adapters'
import { makeFindAllBadgesController } from '@/main/factories/controllers/badge/find-all-badges-controller-factory'
import { Controller, Get, Req, Res } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'

@ApiTags('Badge')
@Controller('/badge')
export class BadgeRoutesController {
  @Get()
  @ApiOperation({
    summary: 'Retorna lista de badges',
    description: 'Retorna lista de badges'
  })
  @ApiResponse({ status: 200, description: 'Sucesso: retorna lista de badges' })
  @ApiResponse({ status: 500, description: 'Internal Server Error: Erro interno do servidor' })
  async getAllBadges (@Req() req: Request, @Res() res: Response): Promise<void> {
    const adaptNest = adaptRoute(makeFindAllBadgesController())
    await adaptNest.adapt(req, res)
  }
}
