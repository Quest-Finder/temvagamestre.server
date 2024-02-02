import { SocialMedia } from './social-media'

describe('SocialMedia Entity', () => {
  it('Should return all social medias', () => {
    const sut = SocialMedia.getSocialMedias()
    expect(sut).toEqual(['facebook', 'instagram', 'twitter', 'reddit'])
  })
})
