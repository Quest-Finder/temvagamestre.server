import jwt from 'jsonwebtoken'
import { ClerkTokenValidation } from './clerk-token-validation'
type MakeSutType = {
  sut: ClerkTokenValidation
  jwtSpy: jest.SpyInstance

}

const makeSut = (): MakeSutType => {
  const jwtSpy = jest.spyOn(jwt, 'verify' as any)
  const sut = new ClerkTokenValidation()
  return {
    sut,
    jwtSpy
  }
}

describe('ClerkTokenValidation', () => {
  it('should return payload when token is valid', async () => {
    const { sut, jwtSpy } = makeSut()
    jwtSpy.mockReturnValue({
      clerkUserId: 'clerk-valid-id'
    })
    const response = sut.verify('valid-token')
    expect(response).toEqual(expect.objectContaining({
      externalUserId: 'clerk-valid-id'
    }))
  })

  it('should return undefine if token is invalid', () => {
    const { sut, jwtSpy } = makeSut()
    jwtSpy.mockImplementation(() => {
      throw new Error()
    })
    const response = sut.verify('invalid-token')
    expect(response).not.toBeTruthy()
  })
})
