import { type CountyStateResponse, type GetCountyState } from '@/domain/contracts/county-state/get-county-state'
import { CountyStateError } from '@/domain/errors/county-state-error'
import { left, right } from '@/shared/either'
import { type IBGEService } from '@/usecases/contracts/services/ibge/ibge-service'

export class CountyStateUsecase implements GetCountyState {
  constructor (private readonly iBGEService: IBGEService) { }
  async perform (uf: string, county: string): Promise<CountyStateResponse> {
    const ibgeResponse = await this.iBGEService.execute(uf, county)

    return ibgeResponse ? right() : left(new CountyStateError())
  }
}
