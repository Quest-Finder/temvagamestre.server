import { FindAllBadgesUseCase } from './find-all-badge-usecase'

describe('FindAllBadgeUseCase', () => {
  it('should call perform usecase method ', async () => {
    const sut = new FindAllBadgesUseCase()
    const sutSpy = jest.spyOn(sut, 'perform')
    await sut.perform()
    expect(sutSpy).toHaveBeenCalled()
  })

  it('should throws if usecase throws', async () => {
    const sut = new FindAllBadgesUseCase()
    jest.spyOn(sut, 'perform').mockRejectedValueOnce(new Error())
    const reponse = sut.perform()
    await expect(reponse).rejects.toThrow()
  })
})
