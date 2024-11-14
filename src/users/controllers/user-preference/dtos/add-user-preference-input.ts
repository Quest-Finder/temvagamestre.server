import { ActiveType, Frequency } from '@/users/repository/entity/user-preference.model'
import { ApiProperty } from '@nestjs/swagger'
import { z } from 'zod'

export class AddUserPreferenceInput {
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

export const userPreferenceSchema = z.object({
  frequency: z.enum(['daily', 'weekly', 'monthly']),
  activeType: z.enum(['player', 'gameMaster'])
})

export type UserPreferenceInput = z.infer<typeof userPreferenceSchema>
