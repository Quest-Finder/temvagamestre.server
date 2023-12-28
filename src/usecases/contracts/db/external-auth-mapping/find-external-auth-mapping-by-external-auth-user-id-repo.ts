import { type ExternalAuthMappingModel } from '@/domain/models'

export interface FindExternalAuthMappingByExternalAuthUserIdRepo {
  execute: (externalAuthUserId: string) => Promise<null | ExternalAuthMappingModel>
}
