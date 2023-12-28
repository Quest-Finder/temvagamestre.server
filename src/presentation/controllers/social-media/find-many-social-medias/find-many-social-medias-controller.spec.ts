import { type FindManySocialMedias, type FindManySocialMediasResponse } from '@/domain/contracts/social-media'
import { type SocialMediaModel } from '@/domain/models/social-media/social-media-model'
import { right } from '@/shared/either'
import { FindManySocialMediasController } from './find-many-social-medias-controller'
import { ok, serverError } from '@/presentation/helpers/http-helpers'

const makeFakeSocialMediasModel = (): SocialMediaModel => ({
  id: 'any_social_media_id',
  name: 'any_social_media_name'
})

const makeFindManySocialMedias = (): FindManySocialMedias => {
  class FindManySocialMediasStub implements FindManySocialMedias {
    async perform (): Promise<FindManySocialMediasResponse> {
      return await Promise.resolve(right([makeFakeSocialMediasModel()]))
    }
  }
  return new FindManySocialMediasStub()
}

type SutTypes = {
  sut: FindManySocialMediasController
  findManySocialMediasStub: FindManySocialMedias
}

const makeSut = (): SutTypes => {
  const findManySocialMediasStub = makeFindManySocialMedias()
  const sut = new FindManySocialMediasController(findManySocialMediasStub)

  return {
    findManySocialMediasStub,
    sut
  }
}

describe('FindManySocialMediasController', () => {
  it('Should call FindManySocialMedias with no value', async () => {
    const { sut, findManySocialMediasStub } = makeSut()
    const performSpy = jest.spyOn(findManySocialMediasStub, 'perform')
    await sut.handle()

    expect(performSpy).toHaveBeenCalledTimes(1)
    expect(performSpy).toHaveBeenCalledWith()
  })

  it('Should return 500 if FindManySocialMedias throws', async () => {
    const { sut, findManySocialMediasStub } = makeSut()
    jest.spyOn(findManySocialMediasStub, 'perform').mockReturnValueOnce(Promise.resolve(Promise.reject(new Error())))
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(serverError())
  })

  it('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(ok([makeFakeSocialMediasModel()]))
  })
})
