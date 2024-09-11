import { Body, Controller, Post } from '@nestjs/common'
import { SignUpService } from './sign-up-with-email.service'
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { SignUpWithEmailDto } from './sign-up-with-email-dto'

@ApiTags('SignUp-With-Email')
@Controller('/user/signup')
export class SignUpController {
  constructor (private readonly signUpService: SignUpService) {}

  @Post('/email')
  @ApiBody({ type: SignUpWithEmailDto })
  @ApiResponse({ status: 201, description: 'Sucesso: Usuário Cadastrado' })
  @ApiResponse({ status: 400, description: 'Bad Request: E-mail ou senha inválidos' })
  @ApiResponse({ status: 409, description: 'Conflito: Email já cadastrado' })
  @ApiResponse({ status: 500, description: 'Internal Server Error: Erro interno do servidor' })
  async create (@Body() signUpWithEmailDto: SignUpWithEmailDto): Promise<{ token: string }> {
    return await this.signUpService.create(signUpWithEmailDto)
  }
}
