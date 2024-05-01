export interface IBGEService {
  execute: (uf: string, county: string) => Promise<boolean>
}
