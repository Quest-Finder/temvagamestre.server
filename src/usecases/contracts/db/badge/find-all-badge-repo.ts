import { type BadgeModel } from '@/domain/models/badge/badge-model'

export interface FindAllBadgeRepo {
  execute: () => Promise<BadgeModel[]>
}
