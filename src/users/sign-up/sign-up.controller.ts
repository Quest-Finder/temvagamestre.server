import { Body, Controller, Post } from '@nestjs/common';
import { SignUpService } from './sign-up.service';


type SignUpUserDTO =  {
  email: string
  password: string
}

@Controller('sign-up')
export class SignUpController {
  constructor(private readonly signUpService: SignUpService) {}

  @Post()
  create(@Body() createSignUpDto: SignUpUserDTO) {
    return this.signUpService.create(createSignUpDto);
  }
}
