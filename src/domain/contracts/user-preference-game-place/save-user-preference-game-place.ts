import { type NonExistentUserPreferenceError } from '@/domain/errors'
import { type Either } from '@/shared/either'

export interface SaveUserPreferenceGamePlaceData {
  userId: string
  online: boolean
  inPerson: boolean
}

export type SaveUserPreferenceGamePlaceResponse = Either<NonExistentUserPreferenceError, null>

export interface SaveUserPreferenceGamePlace {
  perform: (data: SaveUserPreferenceGamePlaceData) => Promise<SaveUserPreferenceGamePlaceResponse>
}
