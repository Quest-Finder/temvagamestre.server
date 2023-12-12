import { type FindSocialMediaByIdRepo } from '@/usecases/contracts/db/social-media/find-social-media-by-id-repo'
import { UpdateUserSocialMediaUseCase } from './update-user-social-media-usecase'
import { type UpdateUserSocialMediaData } from '@/domain/contracts/user'
import { type SocialMediaModel } from '@/domain/models/social-media/social-media-model'
import { InvalidSocialMediaIdError } from '@/domain/errors'

const makeFakeSocialMediaData = (): UpdateUserSocialMediaData => ({
  externalAuthUserId: 'any_user_id',
  socialMediaId: 'any_social_media_id',
  link: 'any_link'
})

const makeFakeSocialMediaModel = (): SocialMediaModel => ({
  id: 'any_social_media_id',
  name: 'any_name'
})

const makeFindSocialMediaByIdRepo = (): FindSocialMediaByIdRepo => {
  class FindSocialMediaByIdRepoStud implements FindSocialMediaByIdRepo {
    async execute (socialMediaId: string): Promise<null | SocialMediaModel> {
      return await Promise.resolve(makeFakeSocialMediaModel())
    }
  }
  return new FindSocialMediaByIdRepoStud()
}

interface SutTypes {
  sut: UpdateUserSocialMediaUseCase
  findSocialMediaByIdRepoStub: FindSocialMediaByIdRepo
}

const makeSut = (): SutTypes => {
  const findSocialMediaByIdRepoStub = makeFindSocialMediaByIdRepo()
  const sut = new UpdateUserSocialMediaUseCase(findSocialMediaByIdRepoStub)

  return {
    sut,
    findSocialMediaByIdRepoStub
  }
}

describe('UpdateUserSocialMediaUseCase', () => {
  it('Should call FindSocialMediaByIdRepo with correct social media id', async () => {
    const { sut, findSocialMediaByIdRepoStub } = makeSut()
    const executeSpy = jest.spyOn(findSocialMediaByIdRepoStub, 'execute')
    await sut.perform(makeFakeSocialMediaData())
    expect(executeSpy).toHaveBeenCalledTimes(1)
    expect(executeSpy).toHaveBeenCalledWith('any_social_media_id')
  })

  it('Should return InvalidSocialMediaIdError if FindSocialMediaByIdRepo returns null', async () => {
    const { sut, findSocialMediaByIdRepoStub } = makeSut()
    jest.spyOn(findSocialMediaByIdRepoStub, 'execute').mockReturnValueOnce(Promise.resolve(null))
    const result = await sut.perform(makeFakeSocialMediaData())
    expect(result.value).toEqual(new InvalidSocialMediaIdError('any_social_media_id'))
  })
})
