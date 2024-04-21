import { ApiProperty } from '@nestjs/swagger'

export class UserDataMeRouteDto {
  @ApiProperty({
    example: '5eb42a97-19f1-4bc9-9c7e-7fe5aa5a4cef'

  })
    id: string

  @ApiProperty({
    example: 'John'

  })
    firstName: string

  @ApiProperty({
    example: 'Doe'

  })
    lastName: string

  @ApiProperty({
    example: 'user-email@email.com'

  })
    email: string

  @ApiProperty({
    example: 'user-email@email.com'

  })
    nickname?: string

  @ApiProperty({
    example: 'user-email@email.com'

  })
    phone?: string

  @ApiProperty({
    example: 'user-email@email.com'

  })
    addressId?: string

  @ApiProperty({
    example: 'user-email@email.com'

  })
    dateOfBirth?: Date

  constructor (id: string, firstName: string, lastName: string, email: string, nickname: string, addressId: string, dateOfBirth: Date) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.nickname = nickname
    this.addressId = addressId
    this.dateOfBirth = dateOfBirth
  }
}
