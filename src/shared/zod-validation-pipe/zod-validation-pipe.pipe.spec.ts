import { type ArgumentMetadata } from '@nestjs/common'
import { z } from 'zod'
import { ValidationException, type FieldError } from '../exceptions/validation-execption'
import { ZodValidationPipePipe } from './zod-validation-pipe.pipe'

type MakeSutType = {
  sut: ZodValidationPipePipe
}

export const testSchema = z
  .object({
    name: z.string(),
    age: z.number(),
    breed: z.string()
  })
  .required()

const makeSut = (): MakeSutType => {
  const sut = new ZodValidationPipePipe(testSchema)
  return {
    sut
  }
}
const argument: ArgumentMetadata = {}
describe('ZodValidationPipePipe', () => {
  it('should be defined return a parsedValue if is valid', async () => {
    const { sut } = makeSut()
    const inputData = { name: 'Felipe', age: 12, breed: 'string' }
    const value = sut.transform(inputData, argument)

    expect(value).toEqual(expect.objectContaining(inputData))
  })

  it('should a validation throws', () => {
    const { sut } = makeSut()
    let failData: FieldError = []
    try {
      testSchema.parse({})
    } catch (error: any) {
      failData = error.errors.map(error => ({ field: error.path.toString(), message: error.message }))
    }

    const test = (): any => sut.transform({}, argument)
    expect(test).toThrow(new ValidationException(failData))
  })
})
