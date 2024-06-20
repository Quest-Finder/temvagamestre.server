import { adaptRoute } from '@/factories/adapters'
import { makeFindManyRpgStylesController } from '@/factories/controllers/rpg-style/find-many-rpg-styles-controller-factory'
import { Controller, Get, Req, Res } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'

@ApiTags('Rpg-Style')
@Controller('/rpg-style')
export class RpgStyleRoutes {
  @Get()
  @ApiOperation({
    summary: 'Busca todos os estilos de RPG',
    description: 'Busca todos os estilo de RPG pré-cadastrados'
  })
  async findManyRpgStyles (@Req() req: Request, @Res() res: Response): Promise<void> {
    const adaptNest = adaptRoute(makeFindManyRpgStylesController())
    await adaptNest.adapt(req, res)
  }
}
