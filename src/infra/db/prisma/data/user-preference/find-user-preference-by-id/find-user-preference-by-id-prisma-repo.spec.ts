import type { UserModel, UserPreferenceModel } from '@/domain/models'
import { PrismaHelper } from '@/infra/db/prisma/helpers/prisma-helper'
import { type PrismaClient } from '@prisma/client'
import MockDate from 'mockdate'
import { PrismockClient } from 'prismock'
import { FindUserPreferenceByIdPrismaRepo } from './find-user-preference-by-id-prisma-repo'

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

const makeFakeUserPreferenceModel = (): UserPreferenceModel => ({
  id: 'any_user_id',
  frequency: 'daily',
  activeType: 'player'
})

const makeSut = (): FindUserPreferenceByIdPrismaRepo => {
  return new FindUserPreferenceByIdPrismaRepo()
}

describe('FindUserPreferenceByIdPrismaRepo', () => {
  beforeEach(async () => {
    await prismock.userPreference.deleteMany()
    await prismock.user.deleteMany()
  })

  beforeAll(async () => {
    MockDate.set(new Date())
    prismock = new PrismockClient()
    jest.spyOn(PrismaHelper, 'getPrisma').mockReturnValue(Promise.resolve(prismock))
  })

  afterAll(async () => {
    await prismock.$disconnect()
  })

  it('Should return a Preference if prisma findUnique() is a success', async () => {
    const sut = makeSut()
    await prismock.user.create({ data: makeFakeUserModel() })
    await prismock.userPreference.create({ data: makeFakeUserPreferenceModel() })
    const preference = await sut.execute('any_user_id')
    expect(preference).toEqual({ ...makeFakeUserPreferenceModel() })
  })

  it('Should return null if prisma findUnique() dit not found a preference', async () => {
    const sut = makeSut()
    const preference = await sut.execute('invalid_user_id')
    expect(preference).toBe(null)
  })

  it('Should throw if Prisma throws', async () => {
    const sut = makeSut()
    jest.spyOn(prismock.userPreference, 'findUnique').mockRejectedValue(new Error('any_error_message'))
    const promise = sut.execute('any_user_id')
    await expect(promise).rejects.toThrow(new Error('any_error_message'))
  })
})
