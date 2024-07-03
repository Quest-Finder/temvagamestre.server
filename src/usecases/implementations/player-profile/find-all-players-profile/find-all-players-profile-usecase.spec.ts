import { type FindAllPlayerProfile } from '@/contracts/player-profile/find-all-player-profile'
import { FindAllPlayersProfileUseCase } from './find-all-players-profile-usecase'
type MakeSutType = {
  sut: FindAllPlayerProfile
}
const makeSut = (): MakeSutType => {
  const sut = new FindAllPlayersProfileUseCase()
  return {
    sut
  }
}

describe('FindAllPlayersProfileUseCase', () => {
  it('should call permform method', async () => {
    const { sut } = makeSut()
    const sutSpy = jest.spyOn(sut, 'perform')
    await sut.perform()
    expect(sutSpy).toHaveBeenCalledTimes(1)
  })
})
