import type { Either } from '@/shared/either'
import { SignUpWithEmailZodValidation } from '@/validators/user/sign-up-with-email/sign-up-with-email-zod-validation'
import { ApiProperty } from '@nestjs/swagger'

export class SignUpWithEmailDto {
  @ApiProperty({ example: 'teste@teste.com', description: 'Email do usuário' })
    email: string

  @ApiProperty({ example: 'teste123', description: 'Senha do usuário' })
    password: string

  constructor (email: string, password: string) {
    const validation = new SignUpWithEmailZodValidation()
    const validationResult: Either<Error, void> = validation.validate({ email, password })

    if (validationResult.isLeft()) {
      throw validationResult.value
    }

    this.email = email
    this.password = password
  }
}
