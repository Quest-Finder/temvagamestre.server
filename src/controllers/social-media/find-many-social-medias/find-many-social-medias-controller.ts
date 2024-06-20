import { type FindManySocialMedias } from '@/contracts/social-media'
import type { HttpResponse } from '@/types/http'
import type { Controller } from '@/contracts'
import { serverError, ok } from '@/helpers/http/http-helpers'

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
