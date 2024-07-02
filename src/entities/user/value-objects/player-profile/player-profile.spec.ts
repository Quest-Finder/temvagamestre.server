import { InvalidPlayerProfileIdError } from '../../errors/invalid-plyer-profile-id-error'
import { PlayerProfileId } from './player-profile'

describe('PlayerProfile ValueObject', () => {
  it('Should return InvalidPlayerProfileIdError if playerProfileId is invalid format', () => {
    const result = PlayerProfileId.create('invalid')
    expect(result.value).toEqual(new InvalidPlayerProfileIdError('invalid'))
  })
  it('Should an PlayerProfileId on success', () => {
    const result = PlayerProfileId.create('9228a9a0-c7e0-4d62-80bb-458dd772c4f9')
    expect(result.value).toEqual({ props: '9228a9a0-c7e0-4d62-80bb-458dd772c4f9' })
  })
})
