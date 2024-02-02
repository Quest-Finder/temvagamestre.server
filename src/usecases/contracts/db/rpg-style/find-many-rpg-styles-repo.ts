import { type RpgStyleModel } from '@/domain/models'

export interface FindManyRpgStylesRepo {
  execute: () => Promise<RpgStyleModel[]>
}
