import { ApiProperty } from '@nestjs/swagger'
import { z } from 'zod'
type Pronoun = 'he/his' | 'she/her' | 'they/theirs' | "I don't want to share any pronouns"

type SocialMediaInput = {
  socialMediaId: string
  userLink: string
}

type CityStateInput = {
  city: string
  uf: string
  lifeInBrazil: boolean
}

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
    description: "Gênero do usuário ('he/his' | 'she/her' | 'they/theirs' | 'I don't want to share any pronouns')"
  })
    pronoun: Pronoun

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
    bio?: string

  @ApiProperty({ example: [{ socialMediaId: '31b66f76-82ff-4719-bad0-48154a04f3c7', userLink: '/user_link' }], description: 'array com objetos contendo o id da rede social e o link do usuario (omite-se a parte do link da rede social Ex: https://www.twitter.com)' })
    socialMedias: SocialMediaInput[]

  @ApiProperty({ example: { city: 'São Paulo', uf: 'SP', lifeInBrazil: true }, description: 'Cidade e estado do usuário, caso o usuário não seja brasileiro, os campos uf e city devem ser vazios e lifeInBrazil deve ser falso' })
    cityState?: CityStateInput

  constructor (name: string, username: string, dateOfBirth: string, pronoun: Pronoun, playerProfileId: string, rpgStyles: string[], socialMedias: SocialMediaInput[], cityState: CityStateInput, title?: string, bio?: string) {
    this.name = name
    this.username = username
    this.dateOfBirth = dateOfBirth
    this.pronoun = pronoun
    this.playerProfileId = playerProfileId
    this.rpgStyles = rpgStyles
    this.title = title
    this.bio = bio
    this.socialMedias = socialMedias
    this.cityState = cityState
  }
}

export const registerUserSchema = z.object({
  name: z.string().min(3).max(30).regex(/^[a-zA-ZÀ-ÿ\s]+$/, { message: 'Error' }),
  username: z.string().min(1).max(15).trim().regex(/^[a-zA-Z0-9-']*$/),
  pronoun: z.enum(['he/his', 'she/her', 'they/theirs', "I don't want to share any pronouns"]),
  dateOfBirth: z.string()
    .transform((v) => {
      const [month, day, year] = v.split('-')
      return new Date(`${year}-${month}-${day}`)
    })
    .pipe(z.date()),
  playerProfileId: z.string().uuid(),
  rpgStyles: z.array(z.string().uuid()).min(1).max(3),
  socialMedias: z.array(z.object({
    socialMediaId: z.string().uuid(),
    userLink: z.string()
  })).optional(),
  title: z.string().min(3).max(100).optional(),
  bio: z.string().min(3).max(500).optional(),
  cityState: z.object({
    uf: z.string().length(2),
    city: z.string().optional(),
    lifeInBrazil: z.boolean()
  }).optional()
})

export type RegisterUserInput = z.infer<typeof registerUserSchema>
