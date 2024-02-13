import { type FindManySocialMedias } from '@/domain/contracts/social-media'
import type { HttpResponse } from '@/presentation/types/http'
import type { Controller } from '@/presentation/contracts'
import { serverError, ok } from '@/presentation/helpers/http-helpers'

export class FindManySocialMediasController implements Controller {
  constructor (private readonly findManySocialMedias: FindManySocialMedias) {}

  async handle (): Promise<HttpResponse> {
    try {
      const findManySocialMediasResult = await this.findManySocialMedias.perform()
      return ok(findManySocialMediasResult)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
