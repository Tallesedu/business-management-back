import { Module } from '@nestjs/common';
import { GerenciadoresService } from './gerenciadores.service';
import { GerenciadoresController } from './gerenciadores.controller';

@Module({
  controllers: [GerenciadoresController],
  providers: [GerenciadoresService],
})
export class GerenciadoresModule {}
