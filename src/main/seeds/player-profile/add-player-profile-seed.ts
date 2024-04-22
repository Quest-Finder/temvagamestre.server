import { makeAddPlayerProfileUsecase } from '@/main/factories/usecases/player-profile/add-player-profile-usecase-factory'

const addPlayerProfileSeed = async (): Promise<void> => {
  await makeAddPlayerProfileUsecase().perform()
}

export default addPlayerProfileSeed()
  .then(() => { console.log('Player Profile added successfully!') })
  .catch(console.error)
