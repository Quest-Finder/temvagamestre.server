import { ZodValidationPipePipe } from '@/shared/zod-validation-pipe/zod-validation-pipe.pipe'
import { Body, Controller, Headers, HttpCode, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UserSocialMediaInput, userSocialMediaInputSchema } from './dto/input-user-social-media-dto'
import { UserSocialMediaService } from '@/users/service/user-social-media/user-social-media.service'

@ApiTags('User-Social-Media')
@Controller('/user/social-media')
export class UserSocialMediaController {
  constructor (private readonly userSocialMediaService: UserSocialMediaService) {}

  @Post()
  @ApiOperation({
    summary: 'Salva uma rede social para o usuário',
    description: 'Adiciona uma rede social para o usuário logado caso ele não tenha uma, e atualiza o link caso ele possua a mesma cadastrada'
  })
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'Sucesso: Rede social salva para o usuário' })
  @ApiResponse({ status: 400, description: 'Bad Request: Requisição inválida' })
  @ApiResponse({ status: 401, description: 'Unauthorized: Não autorizado' })
  @ApiResponse({ status: 500, description: 'Internal Server Error: Erro interno do servidor' })
  @HttpCode(204)
  async saveUserSocialMedia (
    @Body(new ZodValidationPipePipe(userSocialMediaInputSchema)) data: UserSocialMediaInput,
      @Headers() headers
  ): Promise<void> {
    const userId = headers.userId
    await this.userSocialMediaService.save({
      ...data, userId
    })
  }
}
