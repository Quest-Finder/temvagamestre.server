import { type CityStateProps } from '@/domain/entities/user/value-objects/city-state/city-state'
import { type CityStateModel } from '@/domain/models/city-state/city-state'
import { type CityStateRepo } from '@/usecases/contracts/db/city-state-repo'
import { PrismaHelper } from '../../helpers'
import { type IdBuilder } from './../../../../../usecases/contracts/id/id-builder'

export class CityStatePrismaRepo implements CityStateRepo {
  constructor (private readonly idBuilder: IdBuilder) { }
  async execute (data: CityStateProps): Promise<CityStateModel> {
    const city = data.city ?? ''
    const uf = data.uf ?? ''
    const prisma = await PrismaHelper.getPrisma()
    return await prisma.cityState.upsert({
      where: {
        city_uf: { city, uf }
      },
      create: { id: this.idBuilder.build(), city, uf, lifeInBrazil: data.lifeInBrazil },
      update: {}
    })
  }
}
