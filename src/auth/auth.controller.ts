import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { TokenPayload } from './dto/TokenPayloadDto.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login-admin/')
  signInAdmin(@Body() signInDto: TokenPayload) {
    return this.authService.signInAdmin(signInDto.email, signInDto.senha);
  }
}
