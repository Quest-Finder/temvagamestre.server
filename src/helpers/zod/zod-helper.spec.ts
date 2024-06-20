import { ZodError, type ZodObject, type ZodRawShape } from 'zod'
import { ValidationError } from '@/errors/validation-error'
import { ZodHelper } from './zod-helper'

jest.mock('zod', () => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const originalZod = jest.requireActual<typeof import('zod')>('zod')

  const mockObject = (): ZodObject<ZodRawShape, 'strip', any> => {
    const originalInstance = originalZod.object({})
    const mockParse = jest.fn(() => originalInstance.parse({}))
    return {
      ...originalInstance,
      parse: mockParse
    } as any
  }

  return {
    ...originalZod,
    object: jest.fn(mockObject)
  }
})

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const zod = async () => { return await import('zod') }

const makeFakeZodSchema = async (): Promise<any> => {
  const z = await zod()
  return z.object({ data: z.string() })
}

describe('ZodHelper', () => {
  it('Should return true if parse with correct values', async () => {
    const sut = ZodHelper.check({
      value: { data: 'any_data' },
      schema: await makeFakeZodSchema()
    })
    expect(sut.isRight()).toBe(true)
  })

  it('Should return an Error if parse throws', async () => {
    const fakeSchema = await makeFakeZodSchema()
    const mockParse = jest.fn(() => { throw new Error() })
    jest.spyOn(fakeSchema, 'parse').mockImplementationOnce(mockParse)
    const sut = ZodHelper.check({
      value: { data: 'any_data' },
      schema: fakeSchema
    })
    expect(sut.isLeft()).toBe(true)
  })

  it('Should return an ValidationError if parse throws and erorr is instanceof ZodError', async () => {
    const fakeSchema = await makeFakeZodSchema()
    const mockParse = jest.fn(() => { throw new ZodError([]) })
    jest.spyOn(fakeSchema, 'parse').mockImplementationOnce(mockParse)
    const sut = ZodHelper.check({
      value: { data: 'any_data' },
      schema: fakeSchema
    })
    expect(sut.value).toEqual(new ValidationError('Validation error'))
  })
})
