import { Test, type TestingModule } from '@nestjs/testing'
import { BadRequestException } from '@nestjs/common'
import { SignUpWithEmailDto } from './sign-up-with-email-dto'
import { SignUpWithEmailZodValidation } from '@/validators/user/sign-up-with-email/sign-up-with-email-zod-validation'
import { left, right } from '@/shared/either'

describe('SignUpWithEmailDto', () => {
  let validation: SignUpWithEmailZodValidation

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SignUpWithEmailZodValidation]
    }).compile()

    validation = module.get<SignUpWithEmailZodValidation>(SignUpWithEmailZodValidation)
  })

  it('should create an instance with valid email and password', () => {
    const email = 'teste@teste.com'
    const password = 'teste123'
    jest.spyOn(validation, 'validate').mockReturnValue(right(undefined))

    const dto = new SignUpWithEmailDto(email, password)

    expect(dto).toBeDefined()
    expect(dto.email).toBe(email)
    expect(dto.password).toBe(password)
  })

  it('should throw BadRequestException with invalid email', () => {
    const email = 'invalid-email'
    const password = 'teste123'
    const error = new Error('Invalid email')
    jest.spyOn(validation, 'validate').mockReturnValue(left(error))

    expect(() => new SignUpWithEmailDto(email, password)).toThrow(BadRequestException)
  })

  it('should throw BadRequestException with invalid password', () => {
    const email = 'teste@teste.com'
    const password = 'short'
    const error = new Error('Invalid password')
    jest.spyOn(validation, 'validate').mockReturnValue(left(error))

    expect(() => new SignUpWithEmailDto(email, password)).toThrow(BadRequestException)
  })
})
