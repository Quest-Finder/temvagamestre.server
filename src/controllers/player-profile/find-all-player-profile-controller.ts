import { type FindAllPlayerProfile } from '@/contracts/player-profile/find-all-player-profile'
import { ok, serverError } from '@/helpers/http/http-helpers'
import { type HttpRequest, type HttpResponse } from '@/types'
import { type Controller } from '@nestjs/common/interfaces'

export class FindAllPlayerProfileController implements Controller {
  constructor (private readonly findAllPlayerProfile: FindAllPlayerProfile) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.findAllPlayerProfile.perform()
      return ok([])
    } catch (error: any) {
      return serverError(error)
    }
  }
}
