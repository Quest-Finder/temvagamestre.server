import { IbgeService } from '@/shared/integration/ibge/ibge.service'
import { Injectable } from '@nestjs/common'

type InputCreateCityService = {
  uf: string
  city?: string
}

@Injectable()
export class CityStateService {
  constructor (private readonly ibgeService: IbgeService) { }

  async create ({ uf, city }: InputCreateCityService): Promise<string[]> {
    const result = await this.ibgeService.findCitiesByState({ uf, city })
    return result.cities
  }
}
