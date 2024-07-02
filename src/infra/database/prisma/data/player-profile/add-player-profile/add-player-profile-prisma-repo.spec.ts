import { type PlayerProfileModel } from '@/models'
import { PrismaHelper } from '@/infra/database/prisma/helpers'
import { type PrismaClient } from '@prisma/client'
import { PrismockClient } from 'prismock'
import { AddPlayerProfilePrismaRepo } from './add-player-profile-prisma-repo'

let prismock: PrismaClient

const makeFakePlayerProfileModel = (): PlayerProfileModel => ({
  id: 'any_player_profile_id',
  name: 'any_player_profile_name',
  description: 'any_player_profile_description'
})

const makeSut = (): AddPlayerProfilePrismaRepo => {
  return new AddPlayerProfilePrismaRepo()
}

describe('AddPlayerProfilePrismaRepo', () => {
  beforeAll(async () => {
    prismock = new PrismockClient()
    jest.spyOn(PrismaHelper, 'getPrisma').mockReturnValue(Promise.resolve(prismock))
  })

  beforeEach(async () => {
    await prismock.playerProfile.deleteMany()
  })

  afterAll(async () => {
    await prismock.$disconnect()
  })

  it('Should create a player profile if prisma upsert() is a success', async () => {
    const sut = makeSut()
    await sut.execute(makeFakePlayerProfileModel())
    const rpgStyle = await prismock.playerProfile.findUnique({ where: { id: 'any_player_profile_id' } })
    expect(rpgStyle).toEqual(makeFakePlayerProfileModel())
  })

  it('Should throw if prisma throws', async () => {
    const sut = makeSut()
    jest.spyOn(prismock.playerProfile, 'upsert').mockRejectedValue(
      new Error('any_error_message')
    )
    const promise = sut.execute(makeFakePlayerProfileModel())
    await expect(promise).rejects.toThrow(new Error('any_error_message'))
  })
})
