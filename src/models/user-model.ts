export type UserModel = {
  id: string
  name: string
  username?: string | null
  pronoun?: string | null
  dateOfBirth?: Date | null
  addressId?: string | null
  playerProfileId?: string | null
  authId?: string
}
