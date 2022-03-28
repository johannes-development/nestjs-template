import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

import { AuthSignInDTO, AuthSignUpDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() authSignInDTO: AuthSignInDTO) {
    return this.authService.signIn(authSignInDTO);
  }

  @Post('sign-up')
  async signUp(@Body() authSignUpDTO: AuthSignUpDTO) {
    return this.authService.signUp(authSignUpDTO);
  }
}
