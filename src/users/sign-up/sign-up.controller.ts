import { Body, Controller, Post } from '@nestjs/common'
import { SignUpService } from './sign-up.service'
import { ApiTags } from '@nestjs/swagger'

type SignUpUserDTO = {
  email: string
  password: string
}

@ApiTags('SignUp-With-Email-v2')
@Controller('/user/signup')
export class SignUpController {
  constructor (private readonly signUpService: SignUpService) {}

  @Post('/email/v2')
  async create (@Body() createSignUpDto: SignUpUserDTO) {
    const token = await this.signUpService.create(createSignUpDto)
    return token
  }
}
