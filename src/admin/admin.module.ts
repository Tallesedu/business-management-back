import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AdminRepository } from './repositories/admin.repository';
import { AdminsFactory } from './factories/admin.factory';

@Module({
  controllers: [AdminController],
  providers: [AdminService, AdminRepository, AdminsFactory],
  exports: [AdminService, AdminRepository],
})
export class AdminModule {}
