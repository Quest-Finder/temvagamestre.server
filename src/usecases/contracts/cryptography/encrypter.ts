export interface Encrypter {
  execute: (value: string) => { token: string }
}
