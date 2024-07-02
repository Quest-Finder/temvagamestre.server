import { InvalidSocialMediaError } from '../../errors/invalid-social-media-error'
import { SocialMedia } from './social-media'

describe('SocialMedias Value object', () => {
  it('should return an error if the id isnt valid', () => {
    const socialMediaId = 'any_id'
    const result = SocialMedia.create({
      socialMediaId,
      userLink: 'any_link'
    })
    expect(result.value).toEqual(new InvalidSocialMediaError(socialMediaId))
  })

  it('should return SocialMedia if the id and userLink is valid', () => {
    const props = { socialMediaId: '7e1e51a5-2c45-4d15-bf87-03202dfe4b7e', userLink: 'any_link' }
    const result = SocialMedia.create({
      ...props
    })

    expect(result.value).toEqual({ props: { ...props } })
  })
})
