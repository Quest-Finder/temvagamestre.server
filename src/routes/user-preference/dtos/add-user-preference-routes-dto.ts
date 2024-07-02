import { ActiveType, Frequency } from '@/models'
import { ApiProperty } from '@nestjs/swagger'

export class AddUserPreferenceRoutesDto {
  @ApiProperty({
    example: 'daily',
    enum: {
      daily: 'daily',
      weekly: 'weekly',
      monthly: 'monthly'
    }
  })
    frequency: Frequency

  @ApiProperty({
    example: 'player',
    enum: {
      player: 'player',
      gameMaster: 'gameMaster'
    }
  })
    activeType: ActiveType

  constructor (frequency: Frequency, activeType: ActiveType) {
    this.frequency = frequency
    this.activeType = activeType
  }
}
