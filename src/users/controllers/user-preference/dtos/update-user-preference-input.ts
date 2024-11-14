import { ActiveType, Frequency } from '@/users/repository/entity/user-preference.model'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { z } from 'zod'

export class UserPreferenceUpdateInput {
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

export const updatePreferenceSchema = z.object({
  frequency: z.enum(['daily', 'weekly', 'monthly']),
  activeType: z.enum(['player', 'gameMaster'])
})

export type UpdatePreferenceInput = z.infer<typeof updatePreferenceSchema>
