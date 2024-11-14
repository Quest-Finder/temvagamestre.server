import { Injectable, InternalServerErrorException, type ArgumentMetadata, type PipeTransform } from '@nestjs/common'
import { ZodError, ZodSchema } from 'zod'
import { ValidationException, type FieldError } from '../exceptions/validation-execption'

@Injectable()
export class ZodValidationPipePipe implements PipeTransform {
  constructor (private readonly schema: ZodSchema) {}
  transform (value: any, metadata: ArgumentMetadata): any {
    try {
      const parsedValue = this.schema.parse(value)
      return parsedValue
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const fieldsErrors: FieldError[] = error.errors.map(error => ({ field: error.path.toString(), message: error.message }))
        throw new ValidationException(fieldsErrors)
      }
      throw new InternalServerErrorException(error)
    }
  }
}
