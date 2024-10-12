import { ZodValidationPipePipe } from '@/shared/zod-validation-pipe/zod-validation-pipe.pipe'
import { UserService } from '@/users/service/user/user.service'
import { Body, Controller, Get, Headers, HttpCode, Param, Post, Session } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { z } from 'zod'
import { RegisterUserInput, RegisterUserRoutesDto, registerUserSchema } from './dtos/register-user-routes-dto'

const schema = z.string().max(15)

@ApiTags('User')
@Controller('/user')
export class UserController {
  constructor (
    private readonly userService: UserService
  ) {}

  @Get('/check-username/:username')
  @ApiOperation({
    summary: 'Verifica username do usuario',
    description: 'Verificar se o username do usuario e valido ou exite'
  })
  @ApiParam({
    type: 'string',
    name: 'username',
    required: true
  })
  @ApiResponse({ status: 200, description: 'Sucesso: Username esta disponivel' })
  @ApiResponse({ status: 400, description: 'Bad Request: Requisição inválida, username sendo utilizado' })
  @ApiResponse({ status: 401, description: 'Unauthorized: Não autorizado' })
  @ApiResponse({ status: 404, description: 'Not Found: Username não foi encontrado' })
  @ApiResponse({ status: 500, description: 'Internal Server Error: Erro interno do servidor' })
  async checkUserName (@Param('username', new ZodValidationPipePipe(schema)) username: string): Promise<void> {
    await this.userService.checkUsernameIsAvailable(username)
  }

  @Post()
  @HttpCode(204)
  @ApiOperation({
    summary: 'Cadastrar um usuário',
    description: 'Cadastra informações referente ao próprio usuário logado'
  })
  @ApiBearerAuth()
  @ApiBody({ type: RegisterUserRoutesDto })
  @ApiResponse({ status: 204, description: 'Sucesso: Usuário Cadastrado' })
  @ApiResponse({ status: 400, description: 'Bad Request: Requisição inválida' })
  @ApiResponse({ status: 401, description: 'Unauthorized: Não autorizado' })
  @ApiResponse({ status: 500, description: 'Internal Server Error: Erro interno do servidor' })
  async registerUser (
    @Body(new ZodValidationPipePipe(registerUserSchema)) data: RegisterUserInput,
      @Headers() headers,
      @Session() session: Record<string, any>
  ): Promise<void> {
    const userId = headers.userId
    await this.userService.registerUser({
      id: userId,
      user: {
        socialMedias: data.socialMedias ? data.socialMedias : [],
        ...data
      }
    }, session)
  }
}
