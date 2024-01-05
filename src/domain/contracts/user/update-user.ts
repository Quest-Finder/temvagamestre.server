export type UpdateUserData = {
  userId: string
  firstName?: string
  lastName?: string
  nickname?: string
  phone?: string
  dateOfBirth?: string
}

export interface UpdateUser {
  perform: (data: UpdateUserData) => Promise<void>
}
