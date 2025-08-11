import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  handleRequest(err: any, payload: any) {
    if (err || !payload.login) {
      throw new UnauthorizedException('Falha de autenticação: token inválido');
    }
    return payload;
  }
}
