export interface Decrypter {
  execute: (token: string) => Promise<string | null>
}
