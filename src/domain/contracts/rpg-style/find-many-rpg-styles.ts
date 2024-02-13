import { type RpgStyleModel } from '@/domain/models'

export interface FindManyRpgStyles {
  perform: () => Promise<RpgStyleModel[]>
}
