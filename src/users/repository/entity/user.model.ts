export type UserModel = {
  id: string
  name: string
  email: string
  username?: string | null
  externalAuthId?: string | null
  pronoun?: string | null
  dateOfBirth?: Date | null
  addressId?: string | null
  playerProfileId?: string | null
  externalAuthUserId?: string | null
  bio?: string | null
}
