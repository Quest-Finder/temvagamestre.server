import { ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateUserRoutesDto {
  @ApiPropertyOptional({ example: 'John' })
    firstName?: string

  @ApiPropertyOptional({ example: 'Doe' })
    lastName?: string

  @ApiPropertyOptional({ example: '11 9 8989 1122' })
    phone?: string

  @ApiPropertyOptional({
    example: '12-31-2000',
    description: 'Data de nascimento no formato: MM-DD-YYYY',
    format: 'MM-DD-YYYY'
  })
    dateOfBirth?: string

  @ApiPropertyOptional({ example: 'john_doe' })
    nickname?: string

  constructor (firstName?: string, lastName?: string, phone?: string, dateOfBirth?: string, nickname?: string) {
    this.firstName = firstName
    this.lastName = lastName
    this.phone = phone
    this.dateOfBirth = dateOfBirth
    this.nickname = nickname
  }
}
