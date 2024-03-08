import { left, right } from '@/shared/either'
import type { UpdateUserEntityData, UpdateUserEntityResponse, UpdateUserEntityValueObjectsResults } from './user-types'
import { DateOfBirth, FirstName, LastName, Phone } from './value-objects'

export class User {
  static update (data: UpdateUserEntityData): UpdateUserEntityResponse {
    const results: UpdateUserEntityValueObjectsResults = {
      ...(data.firstName && { firstName: FirstName.create(data.firstName) }),
      ...(data.lastName && { lastName: LastName.create(data.lastName) }),
      ...(data.phone && { phone: Phone.create(data.phone) }),
      ...(data.dateOfBirth && { dateOfBirth: DateOfBirth.create(data.dateOfBirth) })
    }

    for (const result of Object.values(results)) {
      if (result.isLeft()) return left(result.value)
    }

    const values = Object.values(results)
    const userValues = values.map(result => result?.value)
    return right(Object.fromEntries(
      userValues.map(
        (value, index) => [Object.keys(results)[index], value[Object.keys(value)[0]]]
      )
    ))
  }
}
