import type { ExternalAuthMappingModel } from '@/domain/models'

export interface AddExternalAuthMappingRepo {
  execute: (data: ExternalAuthMappingModel) => Promise<void>
}
