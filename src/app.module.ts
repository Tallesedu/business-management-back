import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { GerenciadoresModule } from './gerenciadores/gerenciadores.module';
import { KnexModule } from 'nestjs-knex';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    KnexModule.forRoot({
      config: {
        client: 'pg',
        connection: {
          host: process.env.PRIVATE_HOST_DATABASE,
          user: process.env.PRIVATE_USER_DATABASE,
          password: process.env.PRIVATE_PASSWORD_DATABASE,
          database: process.env.PRIVATE_DATABASE,
        },
      },
    }),
    AuthModule,
    AdminModule,
    GerenciadoresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
