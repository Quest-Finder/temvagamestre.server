import { type FindSocialMediaByIdRepo } from '@/usecases/contracts/db/social-media/find-social-media-by-id-repo'
import { UpdateUserSocialMediaUseCase } from './update-user-social-media-usecase'
import { type UpdateUserSocialMediaData } from '@/domain/contracts/user'
import { type SocialMediaModel } from '@/domain/models/social-media/social-media-model'
import { InvalidSocialMediaIdError } from '@/domain/errors'
import { type AddOrUpdateUserSocialMediaByIdsRepo } from '@/usecases/contracts/db/social-media/add-or-update-user-social-media-by-ids-repo'

const makeFakeSocialMediaData = (): UpdateUserSocialMediaData => ({
  externalAuthUserId: 'any_user_id',
  socialMediaId: 'any_social_media_id',
  link: 'any_link'
})

const makeFakeSocialMediaModel = (): SocialMediaModel => ({
  id: 'any_social_media_id',
  name: 'any_name'
})

const makeAddOrUpdateUserSocialMediaByIdsRepo = (): AddOrUpdateUserSocialMediaByIdsRepo => {
  class AddOrUpdateUserSocialMediaByIdsRepoStub implements AddOrUpdateUserSocialMediaByIdsRepo {
    async execute (userId: string, socialMediaId: string): Promise<void> {}
  }
  return new AddOrUpdateUserSocialMediaByIdsRepoStub()
}

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
  addOrUpdateUserSocialMediaByIdsRepoStub: AddOrUpdateUserSocialMediaByIdsRepo
}

const makeSut = (): SutTypes => {
  const addOrUpdateUserSocialMediaByIdsRepoStub = makeAddOrUpdateUserSocialMediaByIdsRepo()
  const findSocialMediaByIdRepoStub = makeFindSocialMediaByIdRepo()
  const sut = new UpdateUserSocialMediaUseCase(findSocialMediaByIdRepoStub, addOrUpdateUserSocialMediaByIdsRepoStub)

  return {
    sut,
    findSocialMediaByIdRepoStub,
    addOrUpdateUserSocialMediaByIdsRepoStub
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

  it('Should call AddOrUpdateUserSocialMediaByIdsRepo with correct values', async () => {
    const { sut, addOrUpdateUserSocialMediaByIdsRepoStub } = makeSut()
    const executeSpy = jest.spyOn(addOrUpdateUserSocialMediaByIdsRepoStub, 'execute')
    await sut.perform(makeFakeSocialMediaData())
    expect(executeSpy).toHaveBeenCalledTimes(1)
    expect(executeSpy).toHaveBeenCalledWith('any_user_id', 'any_social_media_id')
  })
})
