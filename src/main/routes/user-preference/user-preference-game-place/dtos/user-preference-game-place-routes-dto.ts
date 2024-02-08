import { ApiProperty } from '@nestjs/swagger'

export class SaveUserPreferenceGamePlaceRoutesDto {
  @ApiProperty({ example: true })
    online: boolean

  @ApiProperty({ example: false })
    inPerson: boolean

  constructor (online: boolean, inPerson: boolean) {
    this.online = online
    this.inPerson = inPerson
  }
}
