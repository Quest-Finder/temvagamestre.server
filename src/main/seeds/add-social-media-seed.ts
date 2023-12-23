import { makeAddSocialMediaUsecase } from '@/main/factories/usecases/social-media/add-social-media-usecase-factory'

export const addSocialMediaSeed = (): void => {
  try {
    void makeAddSocialMediaUsecase().perform().then((() => { console.log('Success') }))
  } catch (error) {
    console.log(error)
  }
}

addSocialMediaSeed()
