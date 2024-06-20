import { type RegisterUserData } from '@/entities/user'
import { User } from '@/entities/user/user'
import { type CityStateProps } from '@/entities/user/value-objects/city-state/city-state'
import { type UserSocialMediaModel } from '@/models'
import { type CityStateModel } from '@/models/city-state'
import { left, right } from '@/shared/either'
import { type CityStateRepo } from '@/usecases/contracts/db/city-state-repo'
import type { RegisterUserRepo, RegisterUserRepoProps } from '@/usecases/contracts/db/user'
import type { SaveUserSocialMediaRepo } from '@/usecases/contracts/db/user-social-media'
import { type IBGEService, type IBGEServiceProps, type IBGEServiceResponse } from '@/usecases/contracts/services/ibge/ibge-service'
import { RegisterUserUseCase } from './register-user-usecase'

jest.mock('@/entities/user/user', () => ({
  User: {
    register: jest.fn((data: RegisterUserData) => {
      const { dateOfBirth, ...otherData } = data
      return right({
        ...otherData,
        dateOfBirth: new Date('2000-12-31T00:00:00')
      })
    })
  }
}))

const makeFakeRegisterUserData = (): RegisterUserData => ({
  id: 'any_id',
  name: 'John Doe',
  username: 'john-doe',
  pronoun: 'he/his',
  dateOfBirth: '12-31-2000',
  playerProfileId: 'b866459b-63fc-4bd3-a88c-f6d4a7f39cd2',
  rpgStyles: ['b866459b-63fc-4bd3-a88c-f6d4a7f39cd2'],
  cityState: {
    uf: 'any_uf',
    city: 'any_city'
  }
})

const makeRegisterUserRepo = (): RegisterUserRepo => {
  class RegisterUserRepoStub implements RegisterUserRepo {
    async execute ({ user, cityStateId }: RegisterUserRepoProps): Promise<void> {
      await Promise.resolve()
    }
  }
  return new RegisterUserRepoStub()
}

const makeSaveUserSocialMediaRepo = (): SaveUserSocialMediaRepo => {
  class SaveUserSocialMediaRepoStub implements SaveUserSocialMediaRepo {
    async execute (data: UserSocialMediaModel): Promise<void> {
      await Promise.resolve()
    }
  }
  return new SaveUserSocialMediaRepoStub()
}

const makeCityStateRepo = (): CityStateRepo => {
  class CityStateRepoStub implements CityStateRepo {
    async execute (data: CityStateProps): Promise<CityStateModel> {
      return await Promise.resolve({
        id: 'any_id',
        uf: 'any_uf',
        city: 'any_city'
      })
    }
  }
  return new CityStateRepoStub()
}

const makeIBGEService = (): IBGEService => {
  class IBGEServiceStub implements IBGEService {
    async execute ({ uf, city }: IBGEServiceProps): Promise<IBGEServiceResponse> {
      return await Promise.resolve({ cityFounded: true, cities: ['any_city'] })
    }
  }
  return new IBGEServiceStub()
}

type SutTypes = {
  sut: RegisterUserUseCase
  registerUserRepoStub: RegisterUserRepo
  saveUserSocialMediaRepoStub: SaveUserSocialMediaRepo
  cityStateRepoStub: CityStateRepo
  iBGEServiceStub: IBGEService
}

const makeSut = (): SutTypes => {
  const cityStateRepoStub = makeCityStateRepo()
  const iBGEServiceStub = makeIBGEService()
  const saveUserSocialMediaRepoStub = makeSaveUserSocialMediaRepo()
  const registerUserRepoStub = makeRegisterUserRepo()
  const sut = new RegisterUserUseCase(registerUserRepoStub, saveUserSocialMediaRepoStub, cityStateRepoStub, iBGEServiceStub)
  return { sut, registerUserRepoStub, saveUserSocialMediaRepoStub, cityStateRepoStub, iBGEServiceStub }
}

describe('RegisterUserUseCase', () => {
  it('Should call User.register() with correct values', async () => {
    const { sut } = makeSut()
    const registerSpy = jest.spyOn(User, 'register')
    await sut.perform(makeFakeRegisterUserData(), {})
    expect(registerSpy).toHaveBeenCalledWith(makeFakeRegisterUserData())
  })

  it('Should return the same Error if User.register() returns an Error', async () => {
    const { sut } = makeSut()
    jest.spyOn(User, 'register').mockReturnValueOnce(
      left(new Error('any_error'))
    )
    const result = await sut.perform(makeFakeRegisterUserData(), {})
    expect(result.value).toEqual(new Error('any_error'))
  })

  it('Should call RegisterUserRepo with correct values', async () => {
    const { sut, registerUserRepoStub } = makeSut()
    const executeSpy = jest.spyOn(registerUserRepoStub, 'execute')
    await sut.perform(makeFakeRegisterUserData(), {})
    expect(executeSpy).toHaveBeenCalledWith({
      user: {
        id: 'any_id',
        name: 'John Doe',
        username: 'john-doe',
        pronoun: 'he/his',
        dateOfBirth: new Date('2000-12-31T00:00:00'),
        playerProfileId: 'b866459b-63fc-4bd3-a88c-f6d4a7f39cd2',
        rpgStyles: ['b866459b-63fc-4bd3-a88c-f6d4a7f39cd2'],
        cityState: {
          city: 'any_city',
          uf: 'any_uf'
        }
      },
      cityStateId: 'any_id'
    })
  })

  it('Should throw if RegisterUserRepo throws', async () => {
    const { sut, registerUserRepoStub } = makeSut()
    jest.spyOn(registerUserRepoStub, 'execute').mockReturnValueOnce(
      Promise.reject(new Error())
    )
    const promise = sut.perform(makeFakeRegisterUserData(), {})
    await expect(promise).rejects.toThrow()
  })

  it('Should return right result on success', async () => {
    const { sut } = makeSut()
    const result = await sut.perform(makeFakeRegisterUserData(), {})
    expect(result.isRight()).toBe(true)
  })

  it('Should return right result on success with social medias in data', async () => {
    const { sut, saveUserSocialMediaRepoStub } = makeSut()
    const executeSpy = jest.spyOn(saveUserSocialMediaRepoStub, 'execute')
    const result = await sut.perform({ ...makeFakeRegisterUserData(), socialMedias: [{ socialMediaId: 'any_id', userLink: 'any_link' }] }, {})

    expect(executeSpy).toHaveBeenCalledWith({
      userId: 'any_id',
      socialMediaId: 'any_id',
      link: 'any_link'
    })
    expect(result.isRight()).toBe(true)
  })

  it('Should throw if iBGEServiceStub throws', async () => {
    const { sut, iBGEServiceStub } = makeSut()
    jest.spyOn(iBGEServiceStub, 'execute').mockReturnValueOnce(
      Promise.reject(new Error())
    )
    const promise = sut.perform(makeFakeRegisterUserData(), {})
    await expect(promise).rejects.toThrow()
  })

  it('Should throw if iBGEServiceStub throws', async () => {
    const { sut, cityStateRepoStub } = makeSut()
    jest.spyOn(cityStateRepoStub, 'execute').mockReturnValueOnce(
      Promise.reject(new Error())
    )
    const promise = sut.perform(makeFakeRegisterUserData(), {})
    await expect(promise).rejects.toThrow()
  })
})
