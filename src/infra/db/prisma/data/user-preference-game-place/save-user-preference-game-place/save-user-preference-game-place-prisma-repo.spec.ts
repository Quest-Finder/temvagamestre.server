import type { UserModel, UserPreferenceGamePlaceModel, UserPreferenceModel } from '@/domain/models'
import { PrismaHelper } from '@/infra/db/prisma/helpers'
import { type PrismaClient } from '@prisma/client'
import MockDate from 'mockdate'
import { PrismockClient } from 'prismock'
import { SaveUserPreferenceGamePlacePrismaRepo } from './save-user-preference-game-place-prisma-repo'

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

const makeFakeUserPreferenceGamePlaceModel = (): UserPreferenceGamePlaceModel => ({
  id: 'any_user_id',
  online: true,
  inPerson: false
})

const makeSut = (): SaveUserPreferenceGamePlacePrismaRepo => {
  return new SaveUserPreferenceGamePlacePrismaRepo()
}

describe('SaveUserPreferenceGamePlacePrismaRepo', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
    prismock = new PrismockClient()
    jest.spyOn(PrismaHelper, 'getPrisma').mockReturnValue(
      Promise.resolve(prismock)
    )
  })

  beforeEach(async () => {
    await prismock.userPreferenceGamePlace.deleteMany()
    await prismock.userPreference.deleteMany()
    await prismock.user.deleteMany()
  })

  afterAll(async () => {
    MockDate.reset()
    await prismock.$disconnect()
  })

  it('Should add game place when relation does not exist', async () => {
    const sut = makeSut()
    await prismock.user.create({ data: makeFakeUserModel() })
    await prismock.userPreference.create({ data: makeFakeUserPreferenceModel() })
    await sut.execute(makeFakeUserPreferenceGamePlaceModel())
    const gamePlace = await prismock.userPreferenceGamePlace.findUnique({
      where: { id: 'any_user_id' }
    })
    expect(gamePlace).toEqual(makeFakeUserPreferenceGamePlaceModel())
  })

  it('Should update game place when relation exists', async () => {
    const sut = makeSut()
    await prismock.user.create({ data: makeFakeUserModel() })
    await prismock.userPreference.create({ data: makeFakeUserPreferenceModel() })
    await prismock.userPreferenceGamePlace.create({
      data: makeFakeUserPreferenceGamePlaceModel()
    })
    await sut.execute({ ...makeFakeUserPreferenceGamePlaceModel(), inPerson: true })
    const gamePlace = await prismock.userPreferenceGamePlace.findUnique({
      where: { id: 'any_user_id' }
    })
    expect(gamePlace).toEqual({ ...makeFakeUserPreferenceGamePlaceModel(), inPerson: true })
  })

  it('Should throw if Prisma throws', async () => {
    const sut = makeSut()
    jest.spyOn(prismock.userPreferenceGamePlace, 'upsert').mockRejectedValue(
      new Error('any_error_message')
    )
    const promise = sut.execute(makeFakeUserPreferenceGamePlaceModel())
    await expect(promise).rejects.toThrow(new Error('any_error_message'))
  })
})
