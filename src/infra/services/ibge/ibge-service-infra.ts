import { type ExternalRequest } from '@/usecases/contracts/external-request/external-request'
import { type IBGEService, type IBGEServiceProps, type IBGEServiceResponse } from '@/usecases/contracts/services/ibge/ibge-service'

export class IBGEServiceInfra implements IBGEService {
  constructor (private readonly externalRequest: ExternalRequest) { }
  async execute ({ uf, city }: IBGEServiceProps): Promise<IBGEServiceResponse> {
    const response = await this.externalRequest.execute(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)

    const cities: string[] = (response.body as any[]).map((city: any) => city.nome.toLowerCase()
    )
    const cityFounded = city && cities.find(
      c => c.toLowerCase().localeCompare(
        city.toLowerCase(), 'pt-BR', { sensitivity: 'base' }) === 0
    )

    return { cities, cityFounded: !!cityFounded }
  }
}
