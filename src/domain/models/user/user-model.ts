export type UserModel = {
  id: string
  firstName: string
  lastName: string
  email: string
  nickname?: string | null
  phone?: string | null
  addressId?: string | null
  dateOfBirth: Date
}
