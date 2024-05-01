export interface IBGEService {
  execute: (uf: string, city: string) => Promise<boolean>
}
