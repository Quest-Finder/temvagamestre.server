import { makeUuidAdapter } from '@/main/factories/infra/id/uuid-adapter-factory'
import { PrismaClient, type SocialMedia } from '@prisma/client'

const addSocialMediaSeed = async (): Promise<void> => {
  const socialMedia: SocialMedia[] = [{
    id: makeUuidAdapter().build(),
    name: 'Instagram',
    baseUri: 'instagram.com/'
  }, {
    id: makeUuidAdapter().build(),
    name: 'Discord',
    baseUri: 'discordapp.com/users/'
  }, {
    id: makeUuidAdapter().build(),
    name: 'X',
    baseUri: 'x.com/'
  }, {
    id: makeUuidAdapter().build(),
    name: 'Reddit',
    baseUri: 'reddit.com/user/'
  }, {
    id: makeUuidAdapter().build(),
    name: 'Facebook',
    baseUri: 'facebook.com/'
  }]

  const prisma = new PrismaClient()
  await prisma.socialMedia.createMany({ data: socialMedia })
}

export default addSocialMediaSeed()
  .then(() => { console.log('Social Media added successfully!') })
  .catch(console.error)
