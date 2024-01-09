import { type UpdateUserPreferenceData } from '@/domain/contracts/user'
import { type PreferenceModel, type UserModel } from '@/domain/models'
import { type PrismaClient } from '@prisma/client'
import { UpdateUserPreferencePrismaRepo } from './update-user-preference-prisma-repo'
import MockDate from 'mockdate'
import { PrismockClient } from 'prismock'
import { PrismaHelper } from '../../helpers/prisma-helper'

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

const makeFakePreference = (): PreferenceModel => ({
  id: 'any_user_id',
  frequency: 'monthly',
  activeType: 'player'
})

const makeFakeUpdateUserPreferenceData = (): UpdateUserPreferenceData => ({
  id: 'any_user_id',
  frequency: 'daily'
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
    await prismock.preference.deleteMany()
    await prismock.user.deleteMany()
  })

  afterAll(async () => {
    MockDate.reset()
    await prismock.$disconnect()
  })

  it('Should update a User Preference if prisma update() is a success', async () => {
    const sut = makeSut()
    await prismock.user.create({ data: makeFakeUserModel() })
    await prismock.preference.create({ data: makeFakePreference() })
    await sut.execute(makeFakeUpdateUserPreferenceData())
    const preference = await prismock.preference.findUnique({ where: { id: 'any_user_id' } })
    expect(preference).toEqual({
      id: 'any_user_id',
      frequency: 'daily',
      activeType: 'player'
    })
  })

  it('Should throw if Prisma throws', async () => {
    const sut = makeSut()
    jest.spyOn(prismock.preference, 'update').mockRejectedValue(
      new Error('any_error_message')
    )
    const promise = sut.execute(makeFakeUpdateUserPreferenceData())
    await expect(promise).rejects.toThrow(new Error('any_error_message'))
  })
})
