import { adaptRoute } from '@/main/factories/adapters'
import { makeMeController } from '@/main/factories/controllers/user/me-controller-factory'
import { Controller, Get, Req, Res } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { UserDataMeRouteDto } from './dto/user-data-me-route-dto'

@ApiTags('User')
@Controller('/user/me')
export class MeRoutes {
  @Get()
  @ApiOperation({
    summary: 'Recupera informações do usuario',
    description: 'Recupera informações do usuário logado'
  })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Sucesso: Informações do usuario', type: UserDataMeRouteDto })
  @ApiResponse({ status: 403, description: 'Forbidden: Não autorizado' })
  @ApiResponse({ status: 500, description: 'Internal Server Error: Erro interno do servidor' })
  async me (@Req() req: Request, @Res() res: Response): Promise<void> {
    const adaptNest = adaptRoute(makeMeController())
    await adaptNest.adapt(req, res)
  }
}
