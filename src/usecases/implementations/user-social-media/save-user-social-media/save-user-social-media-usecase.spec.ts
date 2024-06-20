import { type SaveUserSocialMediaData } from '@/contracts/user-social-media'
import type { UserSocialMediaModel, SocialMediaModel } from '@/models'
import { type SaveUserSocialMediaRepo } from '@/usecases/contracts/db/user-social-media'
import { SaveUserSocialMediaUseCase } from './save-user-social-media-usecase'
import { InvalidSocialMediaIdError } from '@/errors'
import { type FindSocialMediaByIdRepo } from '@/usecases/contracts/db/social-media'

const makeFakeSaveUserSocialMediaData = (): SaveUserSocialMediaData => ({
  userId: 'any_user_id',
  socialMediaId: 'any_social_media_id',
  link: 'any_link'
})

const makeFakeSocialMediaModel = (): SocialMediaModel => ({
  id: 'some_social_media_id',
  name: 'some_social_media_name',
  baseUri: 'socialmedia.com/'
})

const makeSaveUserSocialMediaRepo = (): SaveUserSocialMediaRepo => {
  class SaveUserSocialMediaRepoStub implements SaveUserSocialMediaRepo {
    async execute (data: UserSocialMediaModel): Promise<void> {
      await Promise.resolve()
    }
  }
  return new SaveUserSocialMediaRepoStub()
}

const makeFindSocialMediaByIdRepo = (): FindSocialMediaByIdRepo => {
  class FindSocialMediaByIdRepoStud implements FindSocialMediaByIdRepo {
    async execute (socialMediaId: string): Promise<null | SocialMediaModel> {
      return await Promise.resolve(makeFakeSocialMediaModel())
    }
  }
  return new FindSocialMediaByIdRepoStud()
}

type SutTypes = {
  sut: SaveUserSocialMediaUseCase
  findSocialMediaByIdRepoStub: FindSocialMediaByIdRepo
  saveUserSocialMediaRepoStub: SaveUserSocialMediaRepo
}

const makeSut = (): SutTypes => {
  const findSocialMediaByIdRepoStub = makeFindSocialMediaByIdRepo()
  const saveUserSocialMediaRepoStub = makeSaveUserSocialMediaRepo()
  const sut = new SaveUserSocialMediaUseCase(findSocialMediaByIdRepoStub, saveUserSocialMediaRepoStub)
  return { sut, findSocialMediaByIdRepoStub, saveUserSocialMediaRepoStub }
}

describe('SaveUserSocialMediaUseCase', () => {
  it('Should call FindSocialMediaByIdRepo with correct social media id', async () => {
    const { sut, findSocialMediaByIdRepoStub } = makeSut()
    const executeSpy = jest.spyOn(findSocialMediaByIdRepoStub, 'execute')
    await sut.perform(makeFakeSaveUserSocialMediaData())
    expect(executeSpy).toHaveBeenCalledTimes(1)
    expect(executeSpy).toHaveBeenCalledWith('any_social_media_id')
  })

  it('Should return InvalidSocialMediaIdError if FindSocialMediaByIdRepo returns null', async () => {
    const { sut, findSocialMediaByIdRepoStub } = makeSut()
    jest.spyOn(findSocialMediaByIdRepoStub, 'execute').mockReturnValueOnce(Promise.resolve(null))
    const result = await sut.perform(makeFakeSaveUserSocialMediaData())
    expect(result.value).toEqual(new InvalidSocialMediaIdError('any_social_media_id'))
  })

  it('Should call SaveUserSocialMediaRepo with correct values', async () => {
    const { sut, saveUserSocialMediaRepoStub } = makeSut()
    const executeSpy = jest.spyOn(saveUserSocialMediaRepoStub, 'execute')
    await sut.perform(makeFakeSaveUserSocialMediaData())
    expect(executeSpy).toHaveBeenCalledTimes(1)
    expect(executeSpy).toHaveBeenCalledWith({
      userId: 'any_user_id',
      socialMediaId: 'any_social_media_id',
      link: 'any_link'
    })
  })

  it('Should throw if SaveUserSocialMediaRepo throws', async () => {
    const { sut, saveUserSocialMediaRepoStub } = makeSut()
    jest.spyOn(saveUserSocialMediaRepoStub, 'execute').mockReturnValueOnce(
      Promise.reject(new Error())
    )
    const promise = sut.perform(makeFakeSaveUserSocialMediaData())
    await expect(promise).rejects.toThrow()
  })

  it('Should return right result on success', async () => {
    const { sut } = makeSut()
    const result = await sut.perform(makeFakeSaveUserSocialMediaData())
    expect(result.isRight()).toBe(true)
  })
})
