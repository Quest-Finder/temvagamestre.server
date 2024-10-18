import { ApiProperty } from '@nestjs/swagger'

export class RpgStyleDto {
  @ApiProperty({ description: 'RPG style id', example: '1231-13221-213dasd-sdasad' })
    id: string

  @ApiProperty({ description: 'RPG name', example: 'rpg name exemple' })
    name: string

  constructor (id: string, name: string) {
    this.id = id
    this.name = name
  }
}
