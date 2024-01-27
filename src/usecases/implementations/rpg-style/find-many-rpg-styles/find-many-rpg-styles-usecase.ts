import type { FindManyRpgStyles, FindManyRpgStylesResponse } from '@/domain/contracts/rpg-style'
import { right } from '@/shared/either'
import { type FindManyRpgStylesRepo } from '@/usecases/contracts/db/rpg-style'

export class FindManyRpgStylesUsecase implements FindManyRpgStyles {
  constructor (
    private readonly findManyRpgStylesRepo: FindManyRpgStylesRepo
  ) {}

  async perform (): Promise<FindManyRpgStylesResponse> {
    const rpgStyles = await this.findManyRpgStylesRepo.execute()

    return right(rpgStyles)
  }
}
