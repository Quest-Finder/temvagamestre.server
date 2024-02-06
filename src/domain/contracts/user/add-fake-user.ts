export type AddFakeUserResponse = {
  token: string
}

export interface AddFakeUser {
  perform: () => Promise<AddFakeUserResponse>
}
