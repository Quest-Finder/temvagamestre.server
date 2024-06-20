import { ApiProperty } from '@nestjs/swagger'

export class CityStateRoutesDto {
  @ApiProperty({ example: 'BA' })
    uf: string

  constructor (uf: string) {
    this.uf = uf
  }
}
