import { type FindAllPlayerProfile } from '@/contracts/player-profile/find-all-player-profile'
import { type PlayerProfileModel } from '@/models'
import { FindAllPlayerProfileController } from './find-all-player-profile-controller'

type MakeSutType = {
  sut: FindAllPlayerProfileController
  findAllPlayerProfile: FindAllPlayerProfile
}

const makeFindAllPlayerProfileStubUseCase = (): FindAllPlayerProfile => {
  class FindAllPlayerProfileStubUseCase implements FindAllPlayerProfile {
    async perform (): Promise<PlayerProfileModel[]> {
      return await Promise.resolve([
        { id: 'valid-id-1', name: 'player-profile-1', description: 'player-profile-1-description' },
        { id: 'valid-id-2', name: 'player-profile-2', description: 'player-profile-2-description' }
      ])
    }
  }

  return new FindAllPlayerProfileStubUseCase()
}

const makeSut = (): MakeSutType => {
  const findAllPlayerProfile = makeFindAllPlayerProfileStubUseCase()
  const sut = new FindAllPlayerProfileController(findAllPlayerProfile)
  return {
    sut,
    findAllPlayerProfile
  }
}

describe('FindAllPlayerProfileController', () => {
  it('Should call FindAllPlayerProfile with no value', async () => {
    const { sut, findAllPlayerProfile } = makeSut()
    const findAllPlayerProfileSpy = jest.spyOn(findAllPlayerProfile, 'perform')
    await sut.handle({})
    expect(findAllPlayerProfileSpy).toHaveBeenCalledTimes(1)
  })
})
