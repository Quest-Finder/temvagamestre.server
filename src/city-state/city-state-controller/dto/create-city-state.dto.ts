import { ApiProperty } from '@nestjs/swagger'
import { z } from 'zod'

export class InputCityState {
  @ApiProperty({ description: 'State abbreviation', example: 'RJ', maxLength: 2, required: true })
    uf: string

  @ApiProperty({ description: 'City name', example: 'Rio das Ostras', required: false })
    city!: string

  constructor (uf: string, city: string) {
    this.uf = uf
    this.city = city
  }
}

export const createCityStateSchema = z
  .object({
    uf: z.string({
      message: 'Campo obrigatorio'
    }).length(2, { message: 'Campo deveter 2 caracteres' }),
    city: z.string().optional()
  })

export type CreateCityStateDto = z.infer<typeof createCityStateSchema>
