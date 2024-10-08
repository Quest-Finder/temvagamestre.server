import { ZodValidationPipePipe } from '@/shared/zod-validation-pipe/zod-validation-pipe.pipe'
import { UserService } from '@/users/service/user/user.service'
import { Controller, Get, Param } from '@nestjs/common'
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { z } from 'zod'

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
}
