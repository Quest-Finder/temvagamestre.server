import { makeAddSocialMediaUsecase } from '@/main/factories/usecases/social-media/add-social-media-usecase-factory'

const addSocialMediaSeed = async (): Promise<void> => {
  await makeAddSocialMediaUsecase().perform()
}

export default addSocialMediaSeed()
  .then(() => { console.log('Social Media added successfully!') })
  .catch(console.error)
