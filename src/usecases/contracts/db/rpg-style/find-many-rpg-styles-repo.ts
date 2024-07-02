import { type RpgStyleModel } from '@/models'

export interface FindManyRpgStylesRepo {
  execute: () => Promise<RpgStyleModel[]>
}
