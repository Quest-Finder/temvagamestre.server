import type { ZodObject, ZodRawShape } from 'zod'
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
  return z.object({ value: z.string() })
}

const makeSut = async (): Promise<ZodHelper> => {
  const schema = await makeFakeZodSchema()
  return new ZodHelper(schema)
}

describe('ZodHelper', () => {
  it('Should return true if parse with correct values', async () => {
    const sut = await makeSut()
    const result = sut.check({ value: 'any_value' })
    expect(result.isRight()).toBe(true)
  })

  it('Should return an ZodError if parse throws', async () => {
    const sut = await makeSut()
    const mockParse = jest.fn(() => { throw new Error() });
    (sut as any).schema.parse = mockParse
    const result = sut.check({ value: 'any_value' })
    expect(result.isLeft()).toBe(true)
  })
})
