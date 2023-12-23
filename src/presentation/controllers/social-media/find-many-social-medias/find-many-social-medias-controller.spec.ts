import { type FindManySocialMedias, type FindManySocialMediasResponse } from '@/domain/contracts/social-media'
import { type SocialMediaModel } from '@/domain/models/social-media/social-media-model'
import { right } from '@/shared/either'
import { FindManySocialMediasController } from './find-many-social-medias-controller'

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
})
