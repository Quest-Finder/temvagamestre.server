import type { UserModel, UserPreferenceModel } from '@/domain/models'
import { PrismaHelper } from '@/infra/db/prisma/helpers/prisma-helper'
import { type PrismaClient } from '@prisma/client'
import MockDate from 'mockdate'
import { PrismockClient } from 'prismock'
import { UpdateUserPreferencePrismaRepo } from './update-user-preference-prisma-repo'

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
  frequency: 'monthly',
  activeType: 'player'
})

const makeFakeUserPreferenceModelUpdated = (): UserPreferenceModel => ({
  id: 'any_user_id',
  frequency: 'daily',
  activeType: 'gameMaster'
})

const makeSut = (): UpdateUserPreferencePrismaRepo => {
  return new UpdateUserPreferencePrismaRepo()
}

describe('UpdateUserPreferencesPrismaRepo', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
    prismock = new PrismockClient()
    jest.spyOn(PrismaHelper, 'getPrisma').mockReturnValue(Promise.resolve(prismock))
  })

  beforeEach(async () => {
    await prismock.userPreference.deleteMany()
    await prismock.user.deleteMany()
  })

  afterAll(async () => {
    MockDate.reset()
    await prismock.$disconnect()
  })

  it('Should update a User Preference if prisma update() is a success', async () => {
    const sut = makeSut()
    await prismock.user.create({ data: makeFakeUserModel() })
    await prismock.userPreference.create({ data: makeFakeUserPreferenceModel() })
    await sut.execute(makeFakeUserPreferenceModelUpdated())
    const preference = await prismock.userPreference.findUnique({ where: { id: 'any_user_id' } })
    expect(preference).toEqual(makeFakeUserPreferenceModelUpdated())
  })

  it('Should throw if Prisma throws', async () => {
    const sut = makeSut()
    jest.spyOn(prismock.userPreference, 'update').mockRejectedValue(
      new Error('any_error_message')
    )
    const promise = sut.execute(makeFakeUserPreferenceModel())
    await expect(promise).rejects.toThrow(new Error('any_error_message'))
  })
})
