import { ApiProperty } from '@nestjs/swagger'
import { z } from 'zod'

export class AddUserPreferenceDayPeriodInput {
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

export const userPreferenceDayPeriodSchema = z.object({
  morning: z.boolean(),
  afternoon: z.boolean(),
  night: z.boolean()
})

export type UserPreferenceDayPeriodInput = z.infer<typeof userPreferenceDayPeriodSchema>
