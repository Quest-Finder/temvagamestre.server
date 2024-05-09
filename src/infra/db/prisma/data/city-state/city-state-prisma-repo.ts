import { type CityStateProps } from '@/domain/entities/user/value-objects/city-state/city-state'
import { type CityStateModel } from '@/domain/models/city-state/city-state'
import { type CityStateRepo } from '@/usecases/contracts/db/city-state-repo'
import { PrismaHelper } from '../../helpers'
import { type IdBuilder } from './../../../../../usecases/contracts/id/id-builder'

export class CityStatePrismaRepo implements CityStateRepo {
  constructor (private readonly idBuilder: IdBuilder) { }
  async execute (data: CityStateProps): Promise<CityStateModel> {
    const prisma = await PrismaHelper.getPrisma()
    return await prisma.cityState.upsert({
      where: {
        city_uf: { ...data }
      },
      create: { id: this.idBuilder.build(), ...data },
      update: {}
    })
  }
}
