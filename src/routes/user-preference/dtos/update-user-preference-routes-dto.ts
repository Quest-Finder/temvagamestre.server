import { ActiveType, Frequency } from '@/models'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateUserPreferenceRoutesDto {
  @ApiPropertyOptional({
    example: 'daily',
    enum: {
      daily: 'daily',
      weekly: 'weekly',
      monthly: 'monthly'
    }
  })
    frequency?: Frequency

  @ApiPropertyOptional({
    example: 'player',
    enum: {
      player: 'player',
      gameMaster: 'gameMaster'
    }
  })
    activeType?: ActiveType

  constructor (frequency?: Frequency, activeType?: ActiveType) {
    this.frequency = frequency
    this.activeType = activeType
  }
}
