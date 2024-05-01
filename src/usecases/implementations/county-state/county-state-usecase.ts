import { type CountyStateResponse, type GetCountyState } from '@/domain/contracts/county-state/get-county-state'
import { CountyStateError } from '@/domain/errors/county-state-error'
import { left, right } from '@/shared/either'
import { type ExternalRequest } from '@/usecases/contracts/external-request/external-request'

export class CountyStateUsecase implements GetCountyState {
  constructor (private readonly externalRequest: ExternalRequest) { }
  async perform (uf: string, county: string): Promise<CountyStateResponse> {
    console.log(uf, county)

    const response = await this.externalRequest.execute(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)

    const counties = (response.body as any[]).map((county: any) => county.nome.toLowerCase()
    )
    const found = counties.find(
      c => c.toLowerCase().localeCompare(
        county.toLowerCase(), 'pt-BR', { sensitivity: 'base' }) === 0
    )

    return found ? right() : left(new CountyStateError())
  }
}
