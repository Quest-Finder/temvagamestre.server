import { Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { type CreateSocialMediaDto } from './dto/social-media.dto'
import { SocialMediaService } from './social-media.service'

@ApiTags('Social-Media')
@Controller('/social-media')
export class SocialMediaController {
  constructor (private readonly socialMediaService: SocialMediaService) {}

  @Get()
  @ApiOperation({
    summary: 'Busca todas as redes sociais',
    description: 'Busca todas as redes sociais pré-cadastradas'
  })
  async findAll (): Promise<CreateSocialMediaDto[]> {
    return await this.socialMediaService.findAll()
  }
}
