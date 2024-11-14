import { PrismaService } from '@/shared/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { v4 } from 'uuid'
import { type CityStateModel } from './entity/city-state.model'
export type CityStateInput = {
  uf: string
  city: string
  lifeInBrazil: boolean
}

@Injectable()
export class CityStateRepository {
  constructor (
    private readonly prismaService: PrismaService
  ) { }

  async save ({ city, lifeInBrazil, uf }: CityStateInput): Promise<CityStateModel> {
    return await this.prismaService.cityState.upsert({
      where: {
        city_uf: { city, uf }
      },
      create: { id: v4(), city, uf, lifeInBrazil },
      update: {}
    })
  }
}
