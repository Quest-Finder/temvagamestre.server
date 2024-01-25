import { RpgStyles, type AddRpgStyle } from '@/domain/contracts/rpg-style'
import { type AddRpgStyleRepo, type FindRpgStyleByNameRepo } from '@/usecases/contracts/db/rpg-style'
import { type IdBuilder } from '@/usecases/contracts/id'

export class AddRpgStyleUsecase implements AddRpgStyle {
  constructor (
    private readonly addRpgStyleRepo: AddRpgStyleRepo,
    private readonly findRpgStyleByNameRepo: FindRpgStyleByNameRepo,
    private readonly idBuilder: IdBuilder
  ) {}

  async perform (): Promise<void> {
    const rpgStyles = RpgStyles.getRpgStyles()

    for (const rpgStyle of rpgStyles) {
      const existingRpgStyle = await this.findRpgStyleByNameRepo.execute(rpgStyle)
      if (!existingRpgStyle) {
        const id = this.idBuilder.build()

        await this.addRpgStyleRepo.execute({
          id,
          name: rpgStyle
        })
      }
    }
  }
}
