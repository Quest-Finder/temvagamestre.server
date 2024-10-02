import { FakeUserService } from '@/users/service/fake-user/fake-user.service'
import { Controller, Get } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

@Controller('/fake-user')
export class FakeUserController {
  constructor (private readonly fakeUserService: FakeUserService) {}

  @Get('/generate-token')
  @ApiOperation({
    summary: 'Cria um usuário falso',
    description: 'Cria um novo usuário falso e retorna um token para acesso com uma hora de validade'
  })
  async generateFakeToken (): Promise<string> {
    const result = await this.fakeUserService.createFakeUser()
    return result.token
  }
}
