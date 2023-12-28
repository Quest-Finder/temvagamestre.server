import { makeAddSocialMediaUsecase } from '@/main/factories/usecases/social-media/add-social-media-usecase-factory'

export const addSocialMediaSeed = async (): Promise<void> => {
  void makeAddSocialMediaUsecase()
    .perform()
    .then(() => { console.log('Add Social Medias success!') })
}

addSocialMediaSeed().catch(console.error)
