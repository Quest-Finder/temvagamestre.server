import { ZodValidationPipePipe } from '@/shared/zod-validation-pipe/zod-validation-pipe.pipe'
import { UserPreferenceDayPeriodService } from '@/users/service/user-preference-day-period/user-preference-day-period.service'
import { Body, Controller, Headers, HttpCode, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AddUserPreferenceDayPeriodInput, UserPreferenceDayPeriodInput, userPreferenceDayPeriodSchema } from './dtos/user-preference-day-period-input'

@ApiTags('User-Preference')

@Controller('/user/preference/day-period')
export class UserPreferenceDayPeriodController {
  constructor (
    private readonly userPreferenceDayPeriodService: UserPreferenceDayPeriodService
  ) {}

  @Post()
  @HttpCode(204)
  @ApiOperation({
    summary: 'Salva períodos do dia para o usuário',
    description: 'Adiciona períodos do dia preferidos para o usuário logado caso ele não tenha um salvo, e atualiza caso ele possua algum cadastrado'
  })
  @ApiBearerAuth()
  @ApiBody({ type: AddUserPreferenceDayPeriodInput })
  @ApiResponse({ status: 204, description: 'Sucesso: Usuário atualizado' })
  @ApiResponse({ status: 400, description: 'Bad Request: Requisição inválida' })
  @ApiResponse({ status: 401, description: 'Unauthorized: Não autorizado' })
  @ApiResponse({ status: 500, description: 'Internal Server Error: Erro interno do servidor' })
  async save (
    @Body(new ZodValidationPipePipe(userPreferenceDayPeriodSchema)) data: UserPreferenceDayPeriodInput,
      @Headers() headers
  ): Promise<void> {
    const userId = headers.userId
    await this.userPreferenceDayPeriodService.save({
      userId,
      ...data
    })
  }
}
