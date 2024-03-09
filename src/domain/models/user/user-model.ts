export type UserModel = {
  id: string
  name: string
  email: string
  username?: string | null
  pronoun?: string | null
  dateOfBirth?: Date | null
  addressId?: string | null
}
