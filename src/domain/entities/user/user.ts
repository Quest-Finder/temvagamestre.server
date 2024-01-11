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
    const firstName = results.firstName?.value as FirstName
    const lastName = results.lastName?.value as LastName
    const phone = results.phone?.value as Phone
    const dateOfBirth = results.dateOfBirth?.value as DateOfBirth
    return right({
      ...(firstName && { firstName: firstName.firstName }),
      ...(lastName && { lastName: lastName.lastName }),
      ...(phone && { phone: phone.phone }),
      ...(dateOfBirth && { dateOfBirth: dateOfBirth.dateOfBirth })
    })
  }
}
