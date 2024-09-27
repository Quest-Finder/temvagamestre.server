import { z } from 'zod'

export const webhookUserSchema = z.object({
  externalAuthUserId: z.string(),
  name: z.string().min(3).max(30),
  email: z.string().email()
})

export type WebhookUserInput = z.infer<typeof webhookUserSchema>
