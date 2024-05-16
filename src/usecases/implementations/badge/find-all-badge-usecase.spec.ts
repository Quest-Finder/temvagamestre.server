import { FindAllBadgesUseCase } from './find-all-badge-usecase'

describe('FindAllBadgeUseCase', () => {
  it('should call perform usecase method ', async () => {
    const sut = new FindAllBadgesUseCase()
    const sutSpy = jest.spyOn(sut, 'perform')
    await sut.perform()
    expect(sutSpy).toHaveBeenCalled()
  })
})
