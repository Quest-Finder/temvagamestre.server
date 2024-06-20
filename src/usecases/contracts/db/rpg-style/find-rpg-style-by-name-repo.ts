import { type RpgStyleModel } from '@/models'

export interface FindRpgStyleByNameRepo {
  execute: (name: string) => Promise<RpgStyleModel | null>
}
