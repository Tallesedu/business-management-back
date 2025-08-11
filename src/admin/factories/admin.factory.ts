import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { AdminRepository } from '../repositories/admin.repository';
import { admins } from '../entities/admin.entity';
import { AdminService } from '../admin.service';
import { Md5 } from 'ts-md5';

@Injectable()
export class AdminsFactory {
  constructor(
    private readonly adminRepository: AdminRepository,
    @Inject(forwardRef(() => AdminService))
    private readonly adminService: AdminService,
  ) {}

  async createAdminFactory(dados: CreateAdminDto) {
    const format = {
      nome: dados.nome,
      email: dados.email,
      senha: Md5.hashStr(dados.senha),
      telefone: dados.telefone ? dados.telefone : '',
      status: dados.status ? dados.status : 'A',
      data_cadastro: await this.adminRepository.sysDate(),
      data_ultima_atualizacao: await this.adminRepository.sysDate(),
    };
    return format;
  }

  async updateAdminFactory(dados: any) {
    const format = {
      nome: dados.nome,
      senha: Md5.hashStr(dados.senha),
      telefone: dados.telefone ? dados.telefone : '',
      status: dados.status ? dados.status : 'A',
      data_cadastro: await this.adminRepository.sysDate(),
      data_ultima_atualizacao: await this.adminRepository.sysDate(),
    };
    return format;
  }

  async visualizaAdminFactory(dados: Partial<admins>) {
    const format = {
      id_admin: dados.id_admin,
      nome: dados.nome,
      email: dados.email,
      senha: dados.senha,
      telefone: dados.telefone,
      status: this.adminService.formataStatus(dados.status),
      data_cadastro: dados.data_cadastro,
      data_ultima_atualizacao: dados.data_ultima_atualizacao,
    };

    return format;
  }
}
