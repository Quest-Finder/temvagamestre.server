import { VerifyTokenClerkAdapter } from './verify-token-clerk-adapter'

jest.mock('@clerk/clerk-sdk-node', () => {
  return {
    __esModule: true,
    Clerk: jest.fn().mockImplementation(() => ({
      verifyToken: jest.fn(async () => makeFakeJwtPayload())
    }))
  }
})

const makeFakeJwtPayload = (): any => ({
  azp: 'http://localhost:3000',
  exp: 1702993068,
  iat: 1702993008,
  iss: 'https://eager-hermit-40.clerk.accounts.dev',
  nbf: 1702992998,
  sid: 'sess_2ZlNy7SvlINBdSAT0A5SkSwJkT3',
  sub: 'user_2ZlNy6vFiPn9L286HdqSEQeEkLy'
})

const makeSut = (): VerifyTokenClerkAdapter => {
  return new VerifyTokenClerkAdapter()
}

describe('VerifyTokenClerkAdapter', () => {
  it('Should return an user clerk id if Clerk verifyToken() is a success', async () => {
    const sut = makeSut()
    const clerkUserId = await sut.execute('any_token')
    expect(clerkUserId).toBe('user_2ZlNy6vFiPn9L286HdqSEQeEkLy')
  })
})
