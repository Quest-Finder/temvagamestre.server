import { type CityStateResponse, type GetCityState } from '@/domain/contracts/county-state/get-county-state'
import { CityStateError } from '@/domain/errors'
import { left, right } from '@/shared/either'
import { type IBGEService } from '@/usecases/contracts/services/ibge/ibge-service'

export class CityStateUsecase implements GetCityState {
  constructor (private readonly iBGEService: IBGEService) { }
  async perform (uf: string, city: string): Promise<CityStateResponse> {
    const ibgeResponse = await this.iBGEService.execute({ uf, city })

    return ibgeResponse ? right() : left(new CityStateError())
  }
}
