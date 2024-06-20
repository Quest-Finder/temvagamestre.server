import { type FindManyRpgStyles } from '@/contracts/rpg-style'
import { FindManyRpgStylesUsecase } from '@/usecases/implementations/rpg-style/find-many-rpg-styles/find-many-rpg-styles-usecase'
import { makeFindManyRpgStylesPrismaRepo } from '../../infra/db/prisma/rpg-style/find-many-rpg-styles-prisma-repo-factory'

export const makeFindManyRpgStylesUsecase = (): FindManyRpgStyles => {
  return new FindManyRpgStylesUsecase(makeFindManyRpgStylesPrismaRepo())
}
