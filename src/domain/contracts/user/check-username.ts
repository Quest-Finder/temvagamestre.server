import { type Either } from '@/shared/either'

export type CheckUsernameResponse = Either<Error, void>

export interface CheckUsername {
  perform: (username: string) => Promise<CheckUsernameResponse>
}
