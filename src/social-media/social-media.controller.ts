import { ErrorDetail } from '@/shared/dtos/error-details.dto'
import { Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { SocialMediaDto } from './dto/social-media.dto'
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
  @ApiResponse({
    status: 200,
    description: 'Sucesso: Retorna lista dos midias sociais',
    type: SocialMediaDto,
    isArray: true
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error: Erro interno do servidor',
    type: ErrorDetail
  })
  async findAll (): Promise<SocialMediaDto[]> {
    return await this.socialMediaService.findAll()
  }
}
