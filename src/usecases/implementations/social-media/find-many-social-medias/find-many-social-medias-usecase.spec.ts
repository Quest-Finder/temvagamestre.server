import { type FindManySocialMediasRepo } from '@/usecases/contracts/db/social-media'
import { FindManySocialMediasUsecase } from './find-many-social-medias-usecase'
import { type SocialMediaModel } from '@/domain/models/social-media/social-media-model'

const makeFakeSocialMediaModel = (): SocialMediaModel => ({
  id: 'any_social_media_id',
  name: 'any_name'
})

const makeFindManySocialMediasRepo = (): FindManySocialMediasRepo => {
  class FindManySocialMediasRepoStub implements FindManySocialMediasRepo {
    async execute (): Promise<SocialMediaModel[] | []> {
      return await Promise.resolve([makeFakeSocialMediaModel()])
    }
  }
  return new FindManySocialMediasRepoStub()
}

type SutTypes = {
  sut: FindManySocialMediasUsecase
  findManySocialMediasRepoStub: FindManySocialMediasRepo
}

const makeSut = (): SutTypes => {
  const findManySocialMediasRepoStub = makeFindManySocialMediasRepo()
  const sut = new FindManySocialMediasUsecase(findManySocialMediasRepoStub)

  return {
    findManySocialMediasRepoStub,
    sut
  }
}

describe('FindManySocialMediasUsecase', () => {
  it('Should call FindManySocialMediasRepo with no values', async () => {
    const { sut, findManySocialMediasRepoStub } = makeSut()
    const executeSpy = jest.spyOn(findManySocialMediasRepoStub, 'execute')
    await sut.perform()
    expect(executeSpy).toHaveBeenCalledTimes(1)
    expect(executeSpy).toHaveBeenCalledWith()
  })

  it('Should throw if FindManySocialMediasRepo throws', async () => {
    const { sut, findManySocialMediasRepoStub } = makeSut()
    jest.spyOn(findManySocialMediasRepoStub, 'execute').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.perform()
    await expect(promise).rejects.toThrow()
  })

  it('Should return right result on success', async () => {
    const { sut } = makeSut()
    const result = await sut.perform()
    expect(result.isRight()).toBe(true)
  })
})
