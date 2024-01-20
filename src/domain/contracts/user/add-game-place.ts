import { type NonExistentUserPreferenceError } from '@/domain/errors'
import { type Either } from '@/shared/either'

export interface AddGamePlaceData {
  id: string
  online: boolean
  inPerson: boolean
}

export type AddGamePlaceResponse = Either<NonExistentUserPreferenceError, null>

export interface AddGamePlace {
  perform: (data: AddGamePlaceData) => Promise<AddGamePlaceResponse>
}
