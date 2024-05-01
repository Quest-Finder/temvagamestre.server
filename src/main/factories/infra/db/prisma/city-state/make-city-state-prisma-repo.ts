import { CityStatePrismaRepo } from '@/infra/db/prisma/data/city-state/city-state-prisma-repo'
import { UuidAdapter } from '@/infra/id/uuid-adapter/uuid-adapter'
import { type CityStateRepo } from '@/usecases/contracts/db/city-state-repo'

export const makeCityStateRepo = (): CityStateRepo => {
  return new CityStatePrismaRepo(new UuidAdapter())
}
