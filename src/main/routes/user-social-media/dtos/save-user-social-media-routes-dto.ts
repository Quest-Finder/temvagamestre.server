import { ApiProperty } from '@nestjs/swagger'

export class SaveUserSocialMediaRoutesDto {
  @ApiProperty({ example: '04563af5-39b7-476d-babf-a689aa3510f3' })
    socialMediaId: string

  @ApiProperty({ example: 'https://www.instagram.com/john_doe/' })
    link: string

  constructor (socialMediaId: string, link: string) {
    this.socialMediaId = socialMediaId
    this.link = link
  }
}
