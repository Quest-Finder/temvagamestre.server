import { type PreferenceModel, type UserModel } from '@/domain/models'
import { type PrismaClient } from '@prisma/client'
import { AddUserPreferencePrismaRepo } from './add-user-preference-prisma-repo'
import MockDate from 'mockdate'
import { PrismockClient } from 'prismock'
import { PrismaHelper } from '../../helpers/prisma-helper'

let prismock: PrismaClient

const makeFakeUserModel = (): UserModel => ({
  id: 'any_user_id',
  email: 'any_email@mail.com',
  lastName: 'any_last_name',
  firstName: 'any_first_name',
  nickname: 'any_nick_name',
  phone: 'any_user_phone',
  dateOfBirth: new Date()
})

const makeFakePreferenceModel = (): PreferenceModel => ({
  id: 'any_user_id',
  frequency: 'daily',
  activeType: 'player'
})

const makeSut = (): AddUserPreferencePrismaRepo => {
  return new AddUserPreferencePrismaRepo()
}

describe('AddUserPreferencePrismaRepo', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
    prismock = new PrismockClient()
    jest.spyOn(PrismaHelper, 'getPrisma').mockReturnValue(
      Promise.resolve(prismock)
    )
  })

  beforeEach(async () => {
    await prismock.preference.deleteMany()
    await prismock.user.deleteMany()
  })

  afterAll(async () => {
    MockDate.reset()
    await prismock.$disconnect()
  })

  it('Should create a preference if prisma create() is a success', async () => {
    const sut = makeSut()
    await prismock.user.create({ data: makeFakeUserModel() })
    await sut.execute(makeFakePreferenceModel())
    const preference = await prismock.preference.findUnique({ where: { id: 'any_user_id' } })
    expect(preference).toEqual(makeFakePreferenceModel())
  })

  it('Should throw if Prisma throws', async () => {
    const sut = makeSut()
    jest.spyOn(prismock.preference, 'create').mockRejectedValue(new Error('any_error_message'))
    const promise = sut.execute(makeFakePreferenceModel())
    await expect(promise).rejects.toThrow(new Error('any_error_message'))
  })
})
