import { type FindAllBadge } from '@/domain/contracts/badge/find-all-badge'
import { type BadgeModel } from '@/domain/models/badge/badge-model'
import { type FindAllBadgeRepo } from '@/usecases/contracts/db/badge/find-all-badge-repo'
import { FindAllBadgesUseCase } from './find-all-badge-usecase'

type MakeSutType = {
  sut: FindAllBadge
  repository: FindAllBadgeRepo
}

class FindAllBadgesRepoStub implements FindAllBadgeRepo {
  async execute (): Promise<BadgeModel[]> {
    return await Promise.resolve([])
  }
}

const makeSut = (): MakeSutType => {
  const repository = new FindAllBadgesRepoStub()
  const sut = new FindAllBadgesUseCase(repository)

  return {
    sut,
    repository
  }
}

describe('FindAllBadgeUseCase', () => {
  it('should call perform usecase method ', async () => {
    const { sut } = makeSut()
    const sutSpy = jest.spyOn(sut, 'perform')
    await sut.perform()
    expect(sutSpy).toHaveBeenCalled()
  })

  it('should throws if usecase throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(sut, 'perform').mockRejectedValueOnce(new Error())
    const reponse = sut.perform()
    await expect(reponse).rejects.toThrow()
  })

  it('should call repository method', async () => {
    const { sut, repository } = makeSut()
    const repositorySpy = jest.spyOn(repository, 'execute')
    await sut.perform()
    expect(repositorySpy).toHaveBeenCalledTimes(1)
  })

  it('should throws if repository throws', async () => {
    const { sut, repository } = makeSut()
    jest.spyOn(repository, 'execute').mockRejectedValueOnce(new Error())
    const reponse = sut.perform()
    await expect(reponse).rejects.toThrow()
  })
})
