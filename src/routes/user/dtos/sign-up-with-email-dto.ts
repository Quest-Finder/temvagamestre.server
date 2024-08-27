import { ApiProperty } from '@nestjs/swagger'

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
