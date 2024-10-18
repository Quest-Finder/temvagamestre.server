import { ErrorDetail, ErrorDetailField } from '@/shared/dtos/error-details.dto'
import { ZodValidationPipePipe } from '@/shared/zod-validation-pipe/zod-validation-pipe.pipe'
import { Body, Controller, Post } from '@nestjs/common'
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { SignUpWithEmailDto, inputSignUpData } from './sign-up-with-email-dto'
import { SignUpService } from './sign-up-with-email.service'

@ApiTags('SignUp-With-Email')
@Controller('/user/signup')
export class SignUpController {
  constructor (private readonly signUpService: SignUpService) {}

  @Post('/email')
  @ApiBody({ type: SignUpWithEmailDto })
  @ApiResponse({
    status: 201,
    description: 'Sucesso: Usuário Cadastrado',
    schema: { type: 'string', example: 'asdadasdajsdhasdá8asd.asd6a54a6sd46a8asdjiqwhw.as5da4sd6sa8' }
  })
  @ApiResponse({ status: 400, description: 'Bad Request: E-mail ou senha inválidos', type: ErrorDetailField })
  @ApiResponse({ status: 409, description: 'Conflito: Email já cadastrado', type: ErrorDetail })
  @ApiResponse({ status: 500, description: 'Internal Server Error: Erro interno do servidor', type: ErrorDetail })
  async create (@Body(new ZodValidationPipePipe(inputSignUpData)) signUpWithEmailDto: SignUpWithEmailDto): Promise<{ token: string }> {
    return await this.signUpService.create(signUpWithEmailDto)
  }
}
