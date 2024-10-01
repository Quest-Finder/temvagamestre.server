import { z } from 'zod'

export const userSocialMediaInputSchema = z.object({
  socialMediaId: z.string(),
  link: z.string().min(3).max(30)
})

export type UserSocialMediaInput = z.infer<typeof userSocialMediaInputSchema>
