import type { ExternalAuthMappingModel } from '@/models'

export interface AddExternalAuthMappingRepo {
  execute: (data: ExternalAuthMappingModel) => Promise<void>
}
