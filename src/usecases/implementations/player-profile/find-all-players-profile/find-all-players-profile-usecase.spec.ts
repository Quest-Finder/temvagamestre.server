import { type PlayerProfileModel } from '@/models'
import { type FindAllPlayerProfileRepo } from '@/usecases/contracts/db/player-profile/find-all-players-profile-repo'
import { FindAllPlayersProfileUseCase } from './find-all-players-profile-usecase'
type MakeSutType = {
  sut: FindAllPlayersProfileUseCase
  repository: FindAllPlayerProfileRepo
}

const makeFindAllPlayersProfileRepoStub = (): FindAllPlayerProfileRepo => {
  class FindAllPlayerProfileRepoStub implements FindAllPlayerProfileRepo {
    async execute (): Promise<PlayerProfileModel[]> {
      return await Promise.resolve([
        { id: 'some-id', name: 'some-name', description: 'some description' }
      ])
    }
  }
  return new FindAllPlayerProfileRepoStub()
}

const makeSut = (): MakeSutType => {
  const repository = makeFindAllPlayersProfileRepoStub()
  const sut = new FindAllPlayersProfileUseCase(repository)
  return {
    sut,
    repository
  }
}

describe('FindAllPlayersProfileUseCase', () => {
  it('should call permform method', async () => {
    const { sut } = makeSut()
    const sutSpy = jest.spyOn(sut, 'perform')
    await sut.perform()
    expect(sutSpy).toHaveBeenCalledTimes(1)
  })

  it('should call FindAllPlayers repository', async () => {
    const { sut, repository } = makeSut()
    const repositorySpy = jest.spyOn(repository, 'execute')
    await sut.perform()
    expect(repositorySpy).toHaveBeenCalledTimes(1)
  })

  it('should throws when repository throws', async () => {
    const { sut, repository } = makeSut()
    jest.spyOn(repository, 'execute').mockRejectedValue(new Error())
    await expect(sut.perform()).rejects.toThrow()
  })

  it('should return a array with player profile', async () => {
    const { sut } = makeSut()
    const response = await sut.perform()
    expect(response).not.toBeNull()
    expect(response.length).toBe(1)
    expect(response).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: 'some-name', description: 'some description' })
    ]))
  })
})
