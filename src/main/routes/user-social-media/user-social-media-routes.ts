import { adaptRoute } from '@/main/factories/adapters'
import { makeSaveUserSocialMediaController } from '@/main/factories/controllers/user-social-media/save-user-social-media-controller-factory'
import { Controller, Post, Req, Res } from '@nestjs/common'
import { ApiTags, ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { SaveUserSocialMediaRoutesDto } from './dtos'

@ApiTags('User-Social-Media')
@Controller('/user/social-media')
export class UserSocialMediaRoutes {
  @Post()
  @ApiOperation({
    summary: 'Salva uma rede social para o usuário',
    description: 'Adiciona um rede social para o usuário logado caso ele não tenha uma, e atualiza o link caso ele possua a mesma cadastrada'
  })
  @ApiBearerAuth()
  @ApiBody({ type: SaveUserSocialMediaRoutesDto })
  @ApiResponse({ status: 204, description: 'Sucesso: Rede social salva para o usuário' })
  @ApiResponse({ status: 400, description: 'Bad Request: Requisição inválida' })
  @ApiResponse({ status: 401, description: 'Unauthorized: Não autorizado' })
  @ApiResponse({ status: 500, description: 'Internal Server Error: Erro interno do servidor' })
  async saveUserSocialMedia (@Req() req: Request, @Res() res: Response): Promise<void> {
    const adaptNest = adaptRoute(makeSaveUserSocialMediaController())
    await adaptNest.adapt(req, res)
  }
}
