export type AuthModel = {
  id: string
  email: string
  password: string
  onboarding: boolean
  refreshToken?: string | null
}
