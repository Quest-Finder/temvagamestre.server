import { makeLogErrorMongoRepo } from '../factories/infra/db/mongodb/log-error-mongo-repo-factory'
import { addSocialMediaSeed } from './social-media/add-social-media-seed'

addSocialMediaSeed()
  .then(() => {
    console.log('Social Media added successfully!')
  })
  .catch(
    async (error: any) => {
      await makeLogErrorMongoRepo().execute({
        date: new Date(),
        stack: error.stack
      })
      throw new Error('Error when adding social media')
    }
  )
