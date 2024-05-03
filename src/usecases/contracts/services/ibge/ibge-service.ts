export type IBGEServiceResponse = { cities: string[], cityFounded: boolean }
export type IBGEServiceProps = {
  uf: string
  city?: string
}
export interface IBGEService {
  execute: ({ uf, city }: IBGEServiceProps) => Promise<IBGEServiceResponse>
}
