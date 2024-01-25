import { type RpgStyleModel } from '@/domain/models'

export interface FindRpgStyleByNameRepo {
  execute: (name: string) => Promise<RpgStyleModel | null>
}
