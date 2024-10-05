import { ApiProperty } from '@nestjs/swagger'
import { z } from 'zod'

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

export const userPreferenceGamePlaceSchema = z.object({
  online: z.boolean(),
  inPerson: z.boolean()
})

export type UserPreferenceGamePlaceInput = z.infer<typeof userPreferenceGamePlaceSchema>
