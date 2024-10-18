import { ApiProperty } from '@nestjs/swagger'
import z from 'zod'
export class SignUpWithEmailDto {
  @ApiProperty({ example: 'teste@teste.com', description: 'Email do usuário' })
    email: string

  @ApiProperty({ example: 'teste123', description: 'Senha do usuário' })
    password: string

  constructor (email: string, password: string) {
    this.email = email
    this.password = password
  }
}

export const inputSignUpData = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})
