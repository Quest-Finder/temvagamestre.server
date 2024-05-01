import { ApiProperty } from '@nestjs/swagger'

export class CountyStateRoutesDto {
  @ApiProperty({ example: 'BA' })
    uf: string

  @ApiProperty({ example: 'Salvador' })
    county: string

  constructor (uf: string, county: string) {
    this.uf = uf
    this.county = county
  }
}
