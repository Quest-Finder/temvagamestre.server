import { Body, Controller, Post } from '@nestjs/common'
import { SignUpService } from './sign-up.service'
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { SignUpWithEmailDto } from './sign-up-with-email-dto'

@ApiTags('SignUp-With-Email-v2')
@Controller('/user/signup')
export class SignUpController {
  constructor (private readonly signUpService: SignUpService) {}

  @Post('/email/v2')
  @ApiBody({ type: SignUpWithEmailDto })
  @ApiResponse({ status: 201, description: 'Sucesso: Usuário Cadastrado' })
  @ApiResponse({ status: 400, description: 'Bad Request: Usuário já existe' })
  @ApiResponse({ status: 500, description: 'Internal Server Error: Erro interno do servidor' })
  async create (@Body() signUpWithEmailDto: SignUpWithEmailDto) {
    const token = await this.signUpService.create(signUpWithEmailDto)
    return token
  }
}
