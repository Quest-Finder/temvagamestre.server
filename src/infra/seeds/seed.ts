import { addPlayerProfiles } from './player-profile/add-player-profile-seed'
import { rgpStyleSeed } from './rpg-style/add-rpg-style-seed'
import { addSocialMediaSeed } from './social-media/add-social-media-seed'

addSocialMediaSeed().then(() => {
  console.log('Social Media added successfully!')
}).catch(() => {
  return new Error('Error when adding social media')
})

rgpStyleSeed().then(() => {
  console.log('Rpg Styles added successfully!')
}).catch(() => {
  return new Error('Error when adding social media')
}
)

addPlayerProfiles().then(() => {
  console.log('Players Profiles added successfully!')
}).catch(() => {
  return new Error('Error when adding social media')
}
)
