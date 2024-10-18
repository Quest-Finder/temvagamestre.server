import { ApiProperty } from '@nestjs/swagger'

export class SocialMediaDto {
  @ApiProperty({ description: 'Social media id', example: '1231-13221-213dasd-sdasad' })
    id: string

  @ApiProperty({ description: 'Social media name', example: 'Facebook' })
    name: string

  @ApiProperty({ description: 'Social media URL', example: 'https://facebook.com' })
    baseUri: string

  constructor (id: string, name: string, baseUri: string) {
    this.id = id
    this.name = name
    this.baseUri = baseUri
  }
}
