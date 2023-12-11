import type { Validation } from '@/presentation/contracts'
import { right, type Either, left } from '@/shared/either'
import { type SvixHeaders } from '../types/svix-headers'
import { InvalidSvixError } from '../errors/invalid-svix-headers'

export class ClerkWebhookValidation implements Validation {
  async validate (input: any): Promise<Either<Error, null>> {
    const headers = input.headers as SvixHeaders
    if (!headers?.['svix-id'] || !headers['svix-signature'] || !headers['svix-timestamp']) {
      return left(new InvalidSvixError())
    }
    return right(null)
  }
}
