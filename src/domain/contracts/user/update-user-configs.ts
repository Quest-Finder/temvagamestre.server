import { type PhoneNotCreatedError } from '@/domain/errors'
import { type Either } from '@/shared/either'

export type UpdateUserConfigsData = {
  userId: string
  allowMessage: boolean
}

export type UpdateUserConfigsResponse = Either<PhoneNotCreatedError, null>

export interface UpdateUserConfigs {
  perform: (data: UpdateUserConfigsData) => Promise<UpdateUserConfigsResponse>
}
