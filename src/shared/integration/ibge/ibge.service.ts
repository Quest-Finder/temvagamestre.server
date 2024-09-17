import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { lastValueFrom } from 'rxjs'

export type IbgeCityServiceReponse = {
  cities: string[]
  cityFounded: boolean
}

export type FindCitiesByState = {
  uf: string
  city: string
}

@Injectable()
export class IbgeService {
  private readonly BASE_URL = 'https://servicodados.ibge.gov.br/api/v1/localidades'

  constructor (private readonly http: HttpService) {}

  async findCitiesByState ({ uf, city }: FindCitiesByState): Promise<IbgeCityServiceReponse> {
    const response = await lastValueFrom(this.http.get(`${this.BASE_URL}/estados/${uf}/municipios`))
    const cities: string[] = await response.data.map(data => data.nome)
    const cityFounded = city && cities.find(
      c => c.toLowerCase().localeCompare(
        city.toLowerCase(), 'pt-BR', { sensitivity: 'base' }) === 0
    )
    return { cities, cityFounded: !!cityFounded }
  }
}
