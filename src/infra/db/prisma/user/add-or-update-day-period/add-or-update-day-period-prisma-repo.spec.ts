import { type PreferenceModel, type UserModel } from '@/domain/models'
import { type DayPeriodModel } from '@/domain/models/day-period/day-period-model'
import { type PrismaClient } from '@prisma/client'
import { AddOrUpdateDayPeriodPrismaRepo } from './add-or-update-day-period-prisma-repo'
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

const makeFakeDayPeriodModel = (): DayPeriodModel => ({
  id: 'any_user_id',
  morning: true,
  afternoon: false,
  night: false
})

const makeSut = (): AddOrUpdateDayPeriodPrismaRepo => {
  return new AddOrUpdateDayPeriodPrismaRepo()
}

describe('AddOrUpdateDayPeriodPrismaRepo', () => {
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

  it('Should add DayPeriod when relation does not exist', async () => {
    const sut = makeSut()
    await prismock.user.create({ data: makeFakeUserModel() })
    await prismock.userPreference.create({ data: makeFakePreferenceModel() })
    await sut.execute(makeFakeDayPeriodModel())

    const dayPeriod = await prismock.userPreferenceDayPeriod.findUnique({
      where: {
        id: 'any_user_id'
      }
    })

    expect(dayPeriod).toEqual(makeFakeDayPeriodModel())
  })

  it('Should update DayPeriod when relation exists', async () => {
    const sut = makeSut()
    await prismock.user.create({ data: makeFakeUserModel() })
    await prismock.userPreference.create({ data: makeFakePreferenceModel() })
    await prismock.userPreferenceDayPeriod.create({ data: makeFakeDayPeriodModel() })

    await sut.execute({ ...makeFakeDayPeriodModel(), morning: false })

    const dayPeriod = await prismock.userPreferenceDayPeriod.findUnique({
      where: {
        id: 'any_user_id'
      }
    })

    expect(dayPeriod).toEqual({ ...makeFakeDayPeriodModel(), morning: false })
  })

  it('Should throw if Prisma throws', async () => {
    const sut = makeSut()
    jest.spyOn(prismock.userPreferenceDayPeriod, 'upsert').mockRejectedValue(
      new Error('any_error_message')
    )

    const promise = sut.execute(makeFakeDayPeriodModel())
    await expect(promise).rejects.toThrow(new Error('any_error_message'))
  })
})
