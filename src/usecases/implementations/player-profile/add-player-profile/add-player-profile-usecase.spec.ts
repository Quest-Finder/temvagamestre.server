import { PlayerProfile } from '@/domain/entities/player-profile/player-profile'
import { type PlayerProfileModel } from '@/domain/models'
import { type AddPlayerProfileRepo } from '@/usecases/contracts/db/player-profile/add-player-profile/add-player-profile-repo'
import { type IdBuilder } from '@/usecases/contracts/id'
import { AddPlayerProfileUsecase } from './add-player-profile-usecase'

jest.mock('@/domain/entities/player-profile/player-profile', () => ({
  PlayerProfile: {
    getPlayerProfiles: jest.fn(() => [{ name: 'any_player_profile', description: 'any_player_profile_description' }])
  }
}))

const makeFakePlayerProfileModel = (): PlayerProfileModel => ({
  id: 'any_player_profile_id',
  name: 'any_player_profile',
  description: 'any_player_profile_description'
})

const makeIdBuilder = (): IdBuilder => {
  class IdBuilderStub implements IdBuilder {
    build (): string { return 'any_player_profile_id' }
  }
  return new IdBuilderStub()
}

const makeAddPlayerProfileRepo = (): AddPlayerProfileRepo => {
  class AddPlayerProfileRepoStub implements AddPlayerProfileRepo {
    async execute (data: PlayerProfileModel): Promise<void> {
      await Promise.resolve()
    }
  }
  return new AddPlayerProfileRepoStub()
}

type SutTypes = {
  sut: AddPlayerProfileUsecase
  addPlayerProfileRepo: AddPlayerProfileRepo
  idBuilder: IdBuilder
}

const makeSut = (): SutTypes => {
  const addPlayerProfileRepo = makeAddPlayerProfileRepo()
  const idBuilder = makeIdBuilder()
  const sut = new AddPlayerProfileUsecase(addPlayerProfileRepo, idBuilder)
  return {
    sut, addPlayerProfileRepo, idBuilder
  }
}

describe('AddPlayerProfileUsecase', () => {
  it('Should call PlayerProfile Entity', async () => {
    const { sut } = makeSut()
    const getPlayerProfilesSpy = jest.spyOn(PlayerProfile, 'getPlayerProfiles')
    await sut.perform()
    expect(getPlayerProfilesSpy).toHaveBeenCalled()
  })

  it('Should call AddRpgStyleRepo with correct values', async () => {
    const { sut, addPlayerProfileRepo } = makeSut()
    const executeSpy = jest.spyOn(addPlayerProfileRepo, 'execute')
    await sut.perform()
    expect(executeSpy).toHaveBeenCalledTimes(1)
    expect(executeSpy).toHaveBeenCalledWith(makeFakePlayerProfileModel())
  })

  it('Should throw if AddRpgStyleRepo throws', async () => {
    const { sut, addPlayerProfileRepo } = makeSut()
    jest.spyOn(addPlayerProfileRepo, 'execute').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.perform()
    await expect(promise).rejects.toThrow()
  })
})
