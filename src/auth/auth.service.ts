import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';
import { GerenciadoresService } from 'src/gerenciadores/gerenciadores.service';
import { handleBadResponse } from 'src/utils/FormatUtils';
import { Md5 } from 'ts-md5';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminServices: AdminService,
    //private readonly gerenciadoresService: GerenciadoresService,
    private readonly JwtService: JwtService,
  ) {}

  async signInAdmin(email: string, senha: string): Promise<any> {
    const user = await this.adminServices.findOneByEmail(email);

    if (user && user.result) {
      if (user.dados.senha !== Md5.hashStr(senha)) {
        return handleBadResponse('Credenciais inválidas!');
      } else {
        let admin = true;

        const payload = { login: user.dados.email, admin: admin };
        const access_token = await this.JwtService.signAsync(payload);
        return {
          result: true,
          dados: {
            token_name: 'Bearer',
            acess_token: access_token,
          },
          message: 'Sucesso!',
        };
      }
    } else return user;
  }
}
