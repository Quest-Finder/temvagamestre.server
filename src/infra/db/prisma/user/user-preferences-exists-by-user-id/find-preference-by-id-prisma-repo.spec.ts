import { FindPreferenceIdPrismaRepo } from './find-preference-by-id-prisma-repo'
import { ActiveType, Frequency, type Preference, type PrismaClient } from '@prisma/client'
import { PrismockClient } from 'prismock'
import { PrismaHelper } from '../../helpers/prisma-helper'
import { type UserModel } from '@/domain/models'

let prismock: PrismaClient

const makeFakeUserModel = (): UserModel => ({
  id: 'any_user_id',
  lastName: 'any_last_name',
  firstName: 'any_first_name',
  nickname: 'any_nick_name',
  phone: 'any_user_phone',
  dateOfBirth: new Date(),
  addressId: 'any_address_id',
  email: 'any_email'
})

const makeFakePreference = (): Preference => ({
  id: 'any_user_id',
  frequency: Frequency.daily,
  activeType: ActiveType.player
})

const makeSut = (): FindPreferenceIdPrismaRepo => {
  return new FindPreferenceIdPrismaRepo()
}

describe('FindPreferenceByIdPrismaRepo', () => {
  beforeEach(async () => {
    await prismock.preference.deleteMany()
    await prismock.user.deleteMany()
  })

  beforeAll(async () => {
    prismock = new PrismockClient()
    jest.spyOn(PrismaHelper, 'getPrisma').mockReturnValue(Promise.resolve(prismock))
  })

  afterAll(async () => {
    await prismock.$disconnect()
  })

  it('Should return a Preference if prisma findUnique() is a success', async () => {
    const sut = makeSut()
    await prismock.user.create({ data: makeFakeUserModel() })
    await prismock.preference.create({ data: makeFakePreference() })
    const preference = await sut.execute('any_user_id')
    expect(preference).toEqual({ ...makeFakePreference() })
  })

  it('Should return null if prisma findUnique() dit not found a preference', async () => {
    const sut = makeSut()
    const preference = await sut.execute('invalid_user_id')
    expect(preference).toBe(null)
  })

  it('Should throw if Prisma throws', async () => {
    const sut = makeSut()
    jest.spyOn(prismock.preference, 'findUnique').mockRejectedValue(new Error('any_error_message'))
    const promise = sut.execute('any_user_id')
    await expect(promise).rejects.toThrow(new Error('any_error_message'))
  })
})
