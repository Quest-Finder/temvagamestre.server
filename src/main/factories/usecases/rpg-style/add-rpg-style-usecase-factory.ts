import { type AddRpgStyle } from '@/domain/contracts/rpg-style'
import { AddRpgStyleUsecase } from '@/usecases/implementations/rpg-style/add-rpg-style/add-rpg-style-usecase'
import { makeAddRpgStylePrismaRepo } from '../../infra/db/prisma/rpg-style/add-rpg-style-prisma-repo-factory'
import { makeFindRpgStyleByNamePrismaRepo } from '../../infra/db/prisma/rpg-style/find-rpg-style-by-name-prisma-repo-factory'
import { makeUuidAdapter } from '../../infra/id/uuid-adapter-factory'

export const makeAddRpgStyleUsecase = (): AddRpgStyle => {
  return new AddRpgStyleUsecase(
    makeAddRpgStylePrismaRepo(),
    makeFindRpgStyleByNamePrismaRepo(),
    makeUuidAdapter()
  )
}
