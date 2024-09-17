import { z } from 'zod'

export const createCityStateSchema = z
  .object({
    uf: z.string({
      message: 'Campo obrigatorio'
    }).length(2, { message: 'Campo deveter 2 caracteres' }),
    city: z.string().optional()
  })

export type CreateCityStateDto = z.infer<typeof createCityStateSchema>
