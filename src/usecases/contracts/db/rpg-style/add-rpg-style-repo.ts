import { type RpgStyleModel } from '@/domain/models'

export interface AddRpgStyleRepo {
  execute: (data: RpgStyleModel) => Promise<void>
}
