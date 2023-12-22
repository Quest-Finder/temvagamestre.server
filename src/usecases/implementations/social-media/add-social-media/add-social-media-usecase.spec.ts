import { type AddSocialMediaRepo } from '@/usecases/contracts/db/social-media'
import { AddSocialMediaUseCase } from './add-social-media-usecase'
import { type SocialMediaModel } from '@/domain/models/social-media/social-media-model'
import { type FindSocialMediaByNameRepo } from '@/usecases/contracts/db/social-media/find-social-media-by-name-repo'
import { type IdBuilder } from '@/usecases/contracts/id'
import { SocialMedias } from '@/domain/contracts/social-media/social-medias'

const makeSocialMediaModel = (): SocialMediaModel => ({
  name: 'facebook',
  id: 'any_social_media_id'
})

const makeIdBuilder = (): IdBuilder => {
  class IdBuilderStub implements IdBuilder {
    build (): string { return 'any_social_media_id' }
  }
  return new IdBuilderStub()
}

const makeFindSocialMediaByNameRepo = (): FindSocialMediaByNameRepo => {
  class FindSocialMediaByNameRepoStub implements FindSocialMediaByNameRepo {
    async execute (name: string): Promise<SocialMediaModel | null> {
      return await Promise.resolve(null)
    }
  }
  return new FindSocialMediaByNameRepoStub()
}

const makeAddSocialMediaRepo = (): AddSocialMediaRepo => {
  class AddSocialMediaRepoStub implements AddSocialMediaRepo {
    async execute (data: SocialMediaModel): Promise<void> {
      await Promise.resolve()
    }
  }
  return new AddSocialMediaRepoStub()
}

type SutTypes = {
  sut: AddSocialMediaUseCase
  addSocialMediaRepo: AddSocialMediaRepo
  findSocialMediaByNameRepo: FindSocialMediaByNameRepo
  idBuilder: IdBuilder
}

const makeSut = (): SutTypes => {
  const addSocialMediaRepo = makeAddSocialMediaRepo()
  const findSocialMediaByNameRepo = makeFindSocialMediaByNameRepo()
  const idBuilder = makeIdBuilder()
  const sut = new AddSocialMediaUseCase(addSocialMediaRepo, findSocialMediaByNameRepo, idBuilder)

  return {
    sut,
    addSocialMediaRepo,
    findSocialMediaByNameRepo,
    idBuilder
  }
}

describe('AddSocialMediaUseCase', () => {
  it('Should call FindSocialMediaByNameRepo with correct social media name', async () => {
    const { sut, findSocialMediaByNameRepo } = makeSut()
    const executeSpy = jest.spyOn(findSocialMediaByNameRepo, 'execute')
    await sut.perform()
    expect(executeSpy).toHaveBeenCalledTimes(SocialMedias.getSocialMedias().length)
    expect(executeSpy).toHaveBeenCalledWith(SocialMedias.getSocialMedias()[0])
  })

  it('Should call AddSocialMediaRepo with correct values', async () => {
    const { sut, addSocialMediaRepo } = makeSut()
    const executeSpy = jest.spyOn(addSocialMediaRepo, 'execute')
    await sut.perform()
    expect(executeSpy).toHaveBeenCalledTimes(SocialMedias.getSocialMedias().length)
    expect(executeSpy).toHaveBeenCalledWith(makeSocialMediaModel())
  })

  it('Should throw if FindSocialMediaByNameRepo throws', async () => {
    const { sut, findSocialMediaByNameRepo } = makeSut()
    jest.spyOn(findSocialMediaByNameRepo, 'execute').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.perform()
    await expect(promise).rejects.toThrow()
  })

  it('Should throw if AddSocialMediaRepo throws', async () => {
    const { sut, addSocialMediaRepo } = makeSut()
    jest.spyOn(addSocialMediaRepo, 'execute').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.perform()
    await expect(promise).rejects.toThrow()
  })
})
