export interface AddFakeUser {
  perform: () => Promise<{ token: string }>
}
