import type { GamePlaceModel, PreferenceModel, UserModel } from '@/domain/models'
import { type PrismaClient } from '@prisma/client'
import { AddOrUpdateGamePlacePrismaRepo } from './add-or-update-game-place-prisma-repo'
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

const makeFakeGamePlaceModel = (): GamePlaceModel => ({
  id: 'any_user_id',
  online: true,
  inPerson: false
})

const makeSut = (): AddOrUpdateGamePlacePrismaRepo => {
  return new AddOrUpdateGamePlacePrismaRepo()
}

describe('AddOrUpdateGamePlacePrismaRepo', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
    prismock = new PrismockClient()
    jest.spyOn(PrismaHelper, 'getPrisma').mockReturnValue(Promise.resolve(prismock))
  })

  beforeEach(async () => {
    await prismock.gamePlace.deleteMany()
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
    await prismock.userPreference.create({ data: makeFakePreferenceModel() })
    await sut.execute(makeFakeGamePlaceModel())

    const gamePlace = await prismock.gamePlace.findUnique({
      where: {
        id: 'any_user_id'
      }
    })

    expect(gamePlace).toEqual(makeFakeGamePlaceModel())
  })

  it('Should update game place when relation exists', async () => {
    const sut = makeSut()
    await prismock.user.create({ data: makeFakeUserModel() })
    await prismock.userPreference.create({ data: makeFakePreferenceModel() })
    await prismock.gamePlace.create({ data: makeFakeGamePlaceModel() })
    await sut.execute({ ...makeFakeGamePlaceModel(), inPerson: true })

    const gamePlace = await prismock.gamePlace.findUnique({
      where: {
        id: 'any_user_id'
      }
    })

    expect(gamePlace).toEqual({ ...makeFakeGamePlaceModel(), inPerson: true })
  })

  it('Should throw if Prisma throws', async () => {
    const sut = makeSut()
    jest.spyOn(prismock.gamePlace, 'upsert').mockRejectedValue(
      new Error('any_error_message')
    )

    const promise = sut.execute(makeFakeGamePlaceModel())
    await expect(promise).rejects.toThrow(new Error('any_error_message'))
  })
})
