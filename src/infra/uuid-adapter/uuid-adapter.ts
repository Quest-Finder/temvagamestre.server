import { type IdBuilder } from '@/usecases/contracts/id'
import * as uuid from 'uuid'

export class UuidAdapter implements IdBuilder {
  build (): string {
    return uuid.v4()
  }

  validate (id: string): boolean {
    return uuid.validate(id)
  };
}
