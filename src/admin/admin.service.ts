import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminRepository } from './repositories/admin.repository';
import {
  handleBadResponse,
  handleError,
  handleResponse,
} from 'src/utils/FormatUtils';
import { AdminsFactory } from './factories/admin.factory';

@Injectable()
export class AdminService {
  constructor(
    private readonly adminRepository: AdminRepository,
    @Inject(forwardRef(() => AdminsFactory))
    private readonly adminsFactory: AdminsFactory,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const transaction = await this.adminRepository.openTransaction();
    try {
      const dadosInsert =
        await this.adminsFactory.createAdminFactory(createAdminDto);

      await this.adminRepository.createAdmin(dadosInsert, transaction);

      await transaction.commit();
      return handleResponse('Usuário admin criado com sucesso!');
    } catch (error) {
      await transaction.rollback();
      console.error(error);
      return handleError(
        'criar usuário admin',
        error,
        'Falha ao criar usuário Admin!',
      );
    }
  }

  async findAll() {
    try {
      let retorno = [];
      let dados = await this.adminRepository.getAll();

      if (dados.length > 0) {
        for (const admin of dados) {
          retorno.push(await this.adminsFactory.visualizaAdminFactory(admin));
        }

        return handleResponse(retorno);
      } else return handleBadResponse('Nenhum usuário admin encontrado!');
    } catch (error) {
      return handleError(
        'buscar todos usuários Admins',
        error,
        'Falha ao buscar todos usuários Admins!',
      );
    }
  }

  async findAllAtivos() {
    try {
      let retorno = [];
      let dados = await this.adminRepository.getAllAtivos();

      if (dados.length > 0) {
        for (const admin of dados) {
          retorno.push(await this.adminsFactory.visualizaAdminFactory(admin));
        }

        return handleResponse(retorno);
      } else return handleBadResponse('Nenhum usuário admin ativo encontrado!');
    } catch (error) {
      return handleError(
        'buscar usuários Admins ativos',
        error,
        'Falha ao buscar usuários admins ativos!',
      );
    }
  }

  async findOne(id: number) {
    try {
      let dados = await this.adminRepository.getOne(id);

      if (dados) {
        const formataDados =
          await this.adminsFactory.visualizaAdminFactory(dados);

        return handleResponse(formataDados);
      } else return handleBadResponse('Usuário admin não encontrado!');
    } catch (error) {
      console.error(error);
      return handleError(
        'buscar admin específico',
        error,
        'Falha ao buscar admin específico!',
      );
    }
  }

  async findOneByEmail(email: string) {
    let dados = await this.adminRepository.getOneByEmail(email);

    if (dados) {
      const formataDados =
        await this.adminsFactory.visualizaAdminFactory(dados);

      return handleResponse(formataDados);
    } else return handleBadResponse('Falha ao buscar dados usuário pelo email');
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const transaction = await this.adminRepository.openTransaction();
    try {
      const dadosUpdate =
        await this.adminsFactory.updateAdminFactory(updateAdminDto);
      await this.adminRepository.updateDadosAdmin(dadosUpdate, id, transaction);
      await transaction.commit();
      return handleResponse('Dados do admin atualizados com sucesso!');
    } catch (error) {
      transaction.rollback();
      console.error(error);
      return handleError('atualizar dados admin', error);
    }
  }

  async updateInativarAdmin(id_admin: number) {
    const transaction = await this.adminRepository.openTransaction();
    try {
      await this.adminRepository.updateInativaAdmin(id_admin, transaction);
      await transaction.commit();
      return handleResponse('Admin inativado com sucesso!');
    } catch (error) {
      transaction.rollback();
      console.error(error);
      return handleError('inativar admin', error);
    }
  }

  formataStatus(status: string) {
    switch (status) {
      case 'A':
        return 'Ativo';
      case 'I':
        return 'Inativo';
      default:
        return 'Status inválido';
    }
  }
}
