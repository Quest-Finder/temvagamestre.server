import { type RpgStyleModel } from '@/models'

export interface AddRpgStyleRepo {
  execute: (data: RpgStyleModel) => Promise<void>
}
