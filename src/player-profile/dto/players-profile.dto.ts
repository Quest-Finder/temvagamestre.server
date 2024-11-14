import { ApiProperty } from '@nestjs/swagger'

export class PlayerProfileDTO {
  @ApiProperty({ example: 'John Doe' })
    id: string

  @ApiProperty({
    example: '12-31-2000',
    description: 'Data de nascimento no formato: MM-DD-YYYY',
    format: 'MM-DD-YYYY'
  })
    name: string

  @ApiProperty({ example: 'john-doe' })
    description: string

  constructor (id: string, name: string, description: string) {
    this.id = id
    this.name = name
    this.description = description
  }
}
