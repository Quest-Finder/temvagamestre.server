import { type SocialMediaProps } from '@/domain/entities/user/value-objects'
import { ApiProperty } from '@nestjs/swagger'

export class RegisterUserRoutesDto {
  @ApiProperty({ example: 'John Doe' })
    name: string

  @ApiProperty({
    example: '12-31-2000',
    description: 'Data de nascimento no formato: MM-DD-YYYY',
    format: 'MM-DD-YYYY'
  })
    dateOfBirth: string

  @ApiProperty({ example: 'john-doe' })
    username: string

  @ApiProperty({
    example: 'she/her',
    description: "Gênero do usuário ('he/his' | 'she/her' | 'they/theirs')"
  })
    pronoun: string

  @ApiProperty({ example: '9228a9a0-c7e0-4d62-80bb-458dd772c4f9', description: 'ID do perfil de jogador' })
    playerProfileId: string

  @ApiProperty({
    example: ['31b66f76-82ff-4719-bad0-48154a04f3c7'],
    description: 'array com os ids dos estilos de jogo do usuario'
  })
    rpgStyles: string[]

  @ApiProperty({ example: 'Software Developer' })
    title?: string

  @ApiProperty({ example: 'I am a software developer' })
    description?: string

  @ApiProperty({ example: [{ socialMediaId: '31b66f76-82ff-4719-bad0-48154a04f3c7', userLink: '/user_link' }], description: 'array com objetos contendo o id da rede social e o link do usuario (omite-se a parte do link da rede social Ex: https://www.twitter.com)' })
    socialMedias: SocialMediaProps[]

  constructor (name: string, username: string, dateOfBirth: string, pronoun: string,playerProfileId: string, rpgStyles: string[], socialMedias: SocialMediaProps[], title?: string, description?: string) {

    this.name = name
    this.username = username
    this.dateOfBirth = dateOfBirth
    this.pronoun = pronoun
    this.playerProfileId = playerProfileId
    this.rpgStyles = rpgStyles
    this.title = title
    this.description = description
    this.socialMedias = socialMedias
  }
}
