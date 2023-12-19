import { VerifyTokenClerkAdapter } from './verify-token-clerk-adapter'
import { Clerk } from '@clerk/clerk-sdk-node'

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
    const clerkResult = await sut.execute('any_token')
    expect(clerkResult).toBe('user_2ZlNy6vFiPn9L286HdqSEQeEkLy')
  })

  it('Should return null if Clerk verifyToken() not returns payload', async () => {
    const sut = makeSut()
    const clerkMock = Clerk as jest.MockedFunction<any>
    clerkMock.mockImplementation(() => ({
      verifyToken: jest.fn(async () => { return {} })
    }))
    const clerkResult = await sut.execute('any_token')
    expect(clerkResult).toBe(null)
  })

  it('Should throw if Clerk verifyToken() trows', async () => {
    const sut = makeSut()
    const clerkMock = Clerk as jest.MockedFunction<any>
    clerkMock.mockImplementation(() => ({
      verifyToken: jest.fn(async () => { throw new Error('any_message') })
    }))
    const promise = sut.execute('any_token')
    await expect(promise).rejects.toThrow(new Error('any_message'))
  })
})
