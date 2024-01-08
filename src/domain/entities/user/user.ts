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
    return right({
      ...(results.firstName && { firstName: results.firstName.value as FirstName }),
      ...(results.lastName && { lastName: results.lastName.value as LastName }),
      ...(results.phone && { phone: results.phone.value as Phone }),
      ...(results.dateOfBirth && { dateOfBirth: results.dateOfBirth.value as DateOfBirth })
    })
  }
}
