import type { FindManyRpgStyles } from '@/contracts/rpg-style'
import { type RpgStyleModel } from '@/models'
import { type FindManyRpgStylesRepo } from '@/usecases/contracts/db/rpg-style'

export class FindManyRpgStylesUsecase implements FindManyRpgStyles {
  constructor (private readonly findManyRpgStylesRepo: FindManyRpgStylesRepo) {}

  async perform (): Promise<RpgStyleModel[]> {
    const rpgStyles = await this.findManyRpgStylesRepo.execute()
    return rpgStyles
  }
}
