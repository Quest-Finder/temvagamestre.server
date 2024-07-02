import { type ExternalAuthMappingModel } from '@/models'

export interface FindExternalAuthMappingByExternalAuthUserIdRepo {
  execute: (externalAuthUserId: string) => Promise<null | ExternalAuthMappingModel>
}
