import { ApiProperty } from '@nestjs/swagger'

export class CityStateRoutesDto {
  @ApiProperty({ example: 'BA' })
    uf: string

  @ApiProperty({ example: 'Salvador' })
    city: string

  constructor (uf: string, city: string) {
    this.uf = uf
    this.city = city
  }
}
