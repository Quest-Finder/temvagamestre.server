import { UuidAdapter } from '@/infra/id/uuid-adapter/uuid-adapter'
import { type IdBuilder } from '@/usecases/contracts/id'

export const makeUuidAdapter = (): IdBuilder => {
  return new UuidAdapter()
}
