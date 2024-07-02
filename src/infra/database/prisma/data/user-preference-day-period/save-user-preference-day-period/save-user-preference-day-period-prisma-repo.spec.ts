import type { UserPreferenceDayPeriodModel, UserModel, UserPreferenceModel } from '@/models'
import { type PrismaClient } from '@prisma/client'
import { SaveUserPreferenceDayPeriodPrismaRepo } from './save-user-preference-day-period-prisma-repo'
import MockDate from 'mockdate'
import { PrismockClient } from 'prismock'
import { PrismaHelper } from '@/infra/database/prisma/helpers'

let prismock: PrismaClient

const makeFakeUserModel = (): UserModel => ({
  id: 'any_user_id',
  email: 'any_email@mail.com',
  name: 'John Doe',
  dateOfBirth: new Date()
})

const makeFakeUserPreferenceModel = (): UserPreferenceModel => ({
  id: 'any_user_id',
  frequency: 'daily',
  activeType: 'player'
})

const makeFakeUserPreferenceDayPeriodModel = (): UserPreferenceDayPeriodModel => ({
  id: 'any_user_id',
  morning: true,
  afternoon: false,
  night: false
})

const makeSut = (): SaveUserPreferenceDayPeriodPrismaRepo => {
  return new SaveUserPreferenceDayPeriodPrismaRepo()
}

describe('SaveUserPreferenceDayPeriodPrismaRepo', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
    prismock = new PrismockClient()
    jest.spyOn(PrismaHelper, 'getPrisma').mockReturnValue(
      Promise.resolve(prismock)
    )
  })

  beforeEach(async () => {
    await prismock.userPreferenceDayPeriod.deleteMany()
    await prismock.userPreference.deleteMany()
    await prismock.user.deleteMany()
  })

  afterAll(async () => {
    MockDate.reset()
    await prismock.$disconnect()
  })

  it('Should add UserPreferenceDayPeriod when relation does not exist', async () => {
    const sut = makeSut()
    await prismock.user.create({ data: makeFakeUserModel() })
    await prismock.userPreference.create({ data: makeFakeUserPreferenceModel() })
    await sut.execute(makeFakeUserPreferenceDayPeriodModel())
    const dayPeriod = await prismock.userPreferenceDayPeriod.findUnique({
      where: { id: 'any_user_id' }
    })
    expect(dayPeriod).toEqual(makeFakeUserPreferenceDayPeriodModel())
  })

  it('Should update UserPreferenceDayPeriod when relation exists', async () => {
    const sut = makeSut()
    await prismock.user.create({ data: makeFakeUserModel() })
    await prismock.userPreference.create({ data: makeFakeUserPreferenceModel() })
    await prismock.userPreferenceDayPeriod.create({ data: makeFakeUserPreferenceDayPeriodModel() })
    await sut.execute({ ...makeFakeUserPreferenceDayPeriodModel(), morning: false })
    const dayPeriod = await prismock.userPreferenceDayPeriod.findUnique({
      where: { id: 'any_user_id' }
    })
    expect(dayPeriod).toEqual({ ...makeFakeUserPreferenceDayPeriodModel(), morning: false })
  })

  it('Should throw if Prisma throws', async () => {
    const sut = makeSut()
    jest.spyOn(prismock.userPreferenceDayPeriod, 'upsert').mockRejectedValue(
      new Error('any_error_message')
    )
    const promise = sut.execute(makeFakeUserPreferenceDayPeriodModel())
    await expect(promise).rejects.toThrow(new Error('any_error_message'))
  })
})
