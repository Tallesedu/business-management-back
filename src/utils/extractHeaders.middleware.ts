import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import {
  extractJWTFromHeaderCpf,
  extractJWTFromHeaderLogin,
  extractJWTFromHeaderTipo,
  extractJWTFromHeaderAdmin,
} from './FormatUtils';

const permittedRoutes = ['/usuario/redefinirSenha/'];
function verificaRotaPermitida(rota: string): boolean {
  return permittedRoutes.some((permittedRoute) =>
    rota.includes(permittedRoute),
  );
}

@Injectable()
export class ExtractHeaders implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!verificaRotaPermitida(req.originalUrl)) {
      req.headers['login'] = extractJWTFromHeaderLogin(req.headers);
      req.headers['tipo-coord'] = extractJWTFromHeaderTipo(req.headers);
      req.headers['cpf'] = extractJWTFromHeaderCpf(req.headers);
      req.headers['admin'] = extractJWTFromHeaderAdmin(req.headers);
    }
    next();
  }
}
