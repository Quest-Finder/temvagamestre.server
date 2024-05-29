import { ApiProperty } from '@nestjs/swagger'

export class BadgeDto {
  @ApiProperty({ example: 'id' })
    id: string

  @ApiProperty({ example: 'icon Name' })
    name: string

  @ApiProperty({ example: 'Icon Type' })
    type: string

  @ApiProperty({ example: 'Description' })
    description: string

  @ApiProperty({ example: 'Criteria' })
    criteria: string

  @ApiProperty({ example: 'Icon URL' })
    icon: string

  constructor (id: string, name: string, type: string, description: string, criteria: string, icon: string) {
    this.id = id
    this.name = name
    this.type = type
    this.description = description
    this.criteria = criteria
    this.icon = icon
  }
}
