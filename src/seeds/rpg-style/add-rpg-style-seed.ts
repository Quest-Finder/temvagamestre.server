import { makeAddRpgStyleUsecase } from '@/factories/usecases/rpg-style/add-rpg-style-usecase-factory'

const addRpgStyleSeed = async (): Promise<void> => {
  await makeAddRpgStyleUsecase().perform()
}

export default addRpgStyleSeed()
  .then(() => { console.log('Rpg Style added successfully!') })
  .catch(console.error)
