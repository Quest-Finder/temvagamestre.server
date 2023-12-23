import { makeAddSocialMediaUsecase } from '@/main/factories/usecases/social-media/add-social-media-usecase-factory'

export const addSocialMediaSeed = (): void => {
  const execute = async (): Promise<void> => {
    try {
      await makeAddSocialMediaUsecase().perform()
    } catch (error) {
      console.log(error)
    }
  }
  void execute().then((() => { console.log('Success') }))
}

addSocialMediaSeed()
