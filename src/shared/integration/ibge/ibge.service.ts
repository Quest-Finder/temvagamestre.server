import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { lastValueFrom } from 'rxjs'

export type City = {
  id: number
  name: string
}

@Injectable()
export class IbgeService {
  private readonly BASE_URL = 'https://servicodados.ibge.gov.br/api/v1/localidades'

  constructor (private readonly http: HttpService) {}

  async findCitiesByState (state: string): Promise<City[]> {
    const response = await lastValueFrom(this.http.get(`${this.BASE_URL}/estados/${state}/municipios`))
    const cities: City[] = response.data.map(data => ({ id: data.id, name: data.nome }))
    return cities
  }
}
