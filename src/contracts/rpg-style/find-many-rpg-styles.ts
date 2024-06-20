import { type RpgStyleModel } from '@/models'

export interface FindManyRpgStyles {
  perform: () => Promise<RpgStyleModel[]>
}
