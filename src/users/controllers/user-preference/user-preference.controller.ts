import { ErrorDetail, ErrorDetailField } from '@/shared/dtos/error-details.dto'
import { ZodValidationPipePipe } from '@/shared/zod-validation-pipe/zod-validation-pipe.pipe'
import { UserPreferenceService } from '@/users/service/user-preference/user-preference.service'
import { Body, Controller, Headers, HttpCode, Patch, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AddUserPreferenceInput, UserPreferenceInput, userPreferenceSchema } from './dtos/add-user-preference-input'
import { UpdatePreferenceInput, UserPreferenceUpdateInput, updatePreferenceSchema } from './dtos/update-user-preference-input'

@ApiTags('User-Preference')
@Controller('/user/preference')
export class UserPreferenceController {
  constructor (private readonly userPreferenceService: UserPreferenceService) {}

  @Post()
  @HttpCode(204)
  @ApiOperation({
    summary: 'Adiciona preferências para o usuário',
    description: 'Adiciona preferências para usuário logado'
  })
  @ApiBearerAuth()
  @ApiBody({ type: AddUserPreferenceInput })
  @ApiResponse({ status: 204, description: 'Sucesso: Preferência do usuário adicionada' })
  @ApiResponse({ status: 400, description: 'Bad Request: Requisição inválida' })
  @ApiResponse({ status: 401, description: 'Unauthorized: Não autorizado' })
  @ApiResponse({ status: 500, description: 'Internal Server Error: Erro interno do servidor' })
  async save (
    @Body(new ZodValidationPipePipe(userPreferenceSchema)) data: UserPreferenceInput,
      @Headers() headers): Promise<void> {
    const userId = headers.userId
    await this.userPreferenceService.save({
      userId,
      ...data
    })
  }

  @Patch()
  @HttpCode(204)
  @ApiOperation({
    summary: 'Atualiza preferências para o usuário',
    description: 'Atualiza preferências para usuário logado'
  })
  @ApiBearerAuth()
  @ApiBody({ type: UserPreferenceUpdateInput })
  @ApiResponse({ status: 204, description: 'Sucesso: Preferência do usuário atualizada' })
  @ApiResponse({ status: 400, description: 'Bad Request: Requisição inválida', type: ErrorDetailField })
  @ApiResponse({ status: 401, description: 'Unauthorized: Não autorizado', type: ErrorDetail })
  @ApiResponse({ status: 500, description: 'Internal Server Error: Erro interno do servidor', type: ErrorDetail })
  async updateUserPreference (
    @Body(new ZodValidationPipePipe(updatePreferenceSchema)) data: UpdatePreferenceInput,
      @Headers() headers): Promise<void> {
    const userId = headers.userId
    await this.userPreferenceService.update({
      userId,
      ...data
    })
  }
}
