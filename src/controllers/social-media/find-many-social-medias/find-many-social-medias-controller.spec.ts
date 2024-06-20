import { type FindManySocialMedias } from '@/contracts/social-media'
import { type SocialMediaModel } from '@/models/social-media-model'
import { ok, serverError } from '@/helpers/http/http-helpers'
import { FindManySocialMediasController } from './find-many-social-medias-controller'

const makeFakeSocialMediasModel = (): SocialMediaModel[] => ([{
  id: 'any_id',
  name: 'any_name',
  baseUri: 'anysocialmedia.com/'
}, {
  id: 'other_id',
  name: 'other_name',
  baseUri: 'othersocialmedia.com/'
}])

const makeFindManySocialMedias = (): FindManySocialMedias => {
  class FindManySocialMediasStub implements FindManySocialMedias {
    async perform (): Promise<SocialMediaModel[]> {
      return await Promise.resolve(makeFakeSocialMediasModel())
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
  return { findManySocialMediasStub, sut }
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
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(ok(makeFakeSocialMediasModel()))
  })
})
