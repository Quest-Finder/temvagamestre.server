import { ErrorDetail } from '@/shared/dtos/error-details.dto'
import { FakeUserService } from '@/users/service/fake-user/fake-user.service'
import { Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Fake-User')
@Controller('/fake-user')
export class FakeUserController {
  constructor (private readonly fakeUserService: FakeUserService) {}

  @Get('/generate-token')
  @ApiOperation({
    summary: 'Cria um usuário falso',
    description: 'Cria um novo usuário falso e retorna um token para acesso com uma hora de validade'
  })
  @ApiResponse({
    status: 200,
    description: 'Sucesso: Retorna lista dos midias sociais',
    schema: { example: '546asdas.sadasdkasdçasdkodwuqobkdbflas.sdasdasjdhasdhsjdasdh', type: 'string' }
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error: Erro interno do servidor',
    type: ErrorDetail
  })
  async generateFakeToken (): Promise<string> {
    const result = await this.fakeUserService.createFakeUser()
    return result.token
  }
}
