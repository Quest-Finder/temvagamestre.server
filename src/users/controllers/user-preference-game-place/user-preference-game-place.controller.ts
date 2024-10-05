import { ZodValidationPipePipe } from '@/shared/zod-validation-pipe/zod-validation-pipe.pipe'
import { Body, Controller, Headers, HttpCode, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UserPreferenceGamePlaceService } from './../../service/user-preference-game-place/user-preference-game-place.service'
import { SaveUserPreferenceGamePlaceRoutesDto, UserPreferenceGamePlaceInput, userPreferenceGamePlaceSchema } from './dtos/user-preference-game-place-routes-dto'

@ApiTags('User-Preference')
@Controller('/user/preference/game-place')
export class UserPreferenceGamePlaceController {
  constructor (
    private readonly userPreferenceGamePlaceService: UserPreferenceGamePlaceService
  ) {}

  @Post()
  @HttpCode(204)
  @ApiOperation({
    summary: 'Salva um local de jogo para o usuário',
    description: 'Adiciona um local de jogo preferido para o usuário logado caso ele não tenha um, e atualiza caso ele possua algum cadastrado'
  })
  @ApiBearerAuth()
  @ApiBody({ type: SaveUserPreferenceGamePlaceRoutesDto })
  @ApiResponse({ status: 204, description: 'Sucesso: Preferência do usuário atualizada' })
  @ApiResponse({ status: 400, description: 'Bad Request: Requisição inválida' })
  @ApiResponse({ status: 401, description: 'Unauthorized: Não autorizado' })
  @ApiResponse({ status: 500, description: 'Internal Server Error: Erro interno do servidor' })
  async saveGamePlace (
    @Body(new ZodValidationPipePipe(userPreferenceGamePlaceSchema)) data: UserPreferenceGamePlaceInput,
      @Headers() headers
  ): Promise<void> {
    const userId = headers.userId
    await this.userPreferenceGamePlaceService.save({
      userId, ...data
    })
  }
}
