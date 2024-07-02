import { UuidAdapter } from '@/infra/uuid-adapter/uuid-adapter'
import { type IdBuilder } from '@/usecases/contracts/id'

export const makeUuidAdapter = (): IdBuilder => {
  return new UuidAdapter()
}
