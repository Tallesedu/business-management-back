import { Injectable } from '@nestjs/common';
import { GerenciadoresService } from '../gerenciadores.service';
import { GerenciadoresRepository } from '../repositories/gerenciadores.repository';
import { CreateGerenciadoresDto } from '../dto/create-gerenciadores.dto';

@Injectable()
export class GerenciadoresFactory {
  constructor(
    private readonly gerenciadoresService: GerenciadoresService,
    private readonly gerenciadoresRepository: GerenciadoresRepository,
  ) {}

  async createGerenciadoresFactory(dados: CreateGerenciadoresDto) {
    const format = {
      id_empresa: dados.id_empresa,
      nome: dados.nome,
      email: dados.email,
      senha: dados.senha,
      telefone: dados.telefone ? dados.telefone : '',
      status: dados.status ? dados.status : 'A',
      data_cadastro: await this.gerenciadoresRepository.sysDate(),
      data_ultima_atualizacao: await this.gerenciadoresRepository.sysDate(),
    };

    return format;
  }
}
