import { ApiProperty } from '@nestjs/swagger'

export class SaveUserPreferenceDayPeriodRoutesDto {
  @ApiProperty({ example: true })
    morning: boolean

  @ApiProperty({ example: false })
    afternoon: boolean

  @ApiProperty({ example: false })
    night: boolean

  constructor (morning: boolean, afternoon: boolean, night: boolean) {
    this.morning = morning
    this.afternoon = afternoon
    this.night = night
  }
}
