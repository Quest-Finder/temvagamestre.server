import type { ZodObject, ZodRawShape } from 'zod'
import type { AddUserData } from '@/domain/contracts/user'
import { ZodHelper, type ZodHelperData } from '@/validators/helpers/zod-helper'
import { SignUpZodValidation } from './signup-zod-validation'
import { right } from '@/shared/either'

// TEST NOT COMPLETED

jest.mock('zod', () => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const originalZod = jest.requireActual<typeof import('zod')>('zod')
  const mockObject = (shape: ZodRawShape): ZodObject<ZodRawShape, 'strip', any> => {
    const originalInstance = originalZod.object(shape)
    return { ...originalInstance } as any
  }

  return {
    ...originalZod,
    object: jest.fn(mockObject)
  }
})

jest.mock('@/validators/helpers/zod-helper', () => ({
  ZodHelper: {
    check: jest.fn((data: ZodHelperData) => {
      return right(null)
    })
  }
}))

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const zod = async () => { return await import('zod') }

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const makeFakeSignUpZodSchema = async () => {
  const z = await zod()
  return z.object({
    externalAuthUserId: z.string(),
    firstName: z.string().min(2).max(25),
    lastName: z.string().min(2).max(50),
    email: z.string().email(),
    phone: z.string().min(11).max(20).optional()
  })
}

const makeFakeInput = (): AddUserData => ({
  externalAuthUserId: 'any_external_auth_user_id',
  firstName: 'any_first_name',
  lastName: 'any_last_name',
  email: 'any_email@mail.com'
})

describe('SignUpZodValidation', () => {
  // TEST NOT COMPLETED
  it('Should call ZodHelper with correct values', async () => {
    const sut = new SignUpZodValidation()
    jest.spyOn(ZodHelper, 'check')
    await sut.validate(makeFakeInput())
    // expect(checkSpy).toHaveBeenCalledWith({
    //   value: makeFakeInput(),
    //   schema: await makeFakeSignUpZodSchema()
    // })
  })
})
