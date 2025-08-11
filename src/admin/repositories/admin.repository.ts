import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { admins } from '../entities/admin.entity';
import { CreateAdminDto } from '../dto/create-admin.dto';

@Injectable()
export class AdminRepository {
  private readonly Admins = () => this.knex<admins>('admins');

  constructor(@InjectKnex() private readonly knex: Knex) {}

  async openTransaction() {
    return await this.knex.transaction();
  }

  async sysDate() {
    const result = await this.knex.raw(`
    SELECT to_char(NOW() AT TIME ZONE 'America/Sao_Paulo', 'YYYY-MM-DD HH24:MI:SS') AS current_time
  `);
    return result.rows[0].current_time;
  }

  async createAdmin(dados: Partial<CreateAdminDto>, transaction: any = null) {
    try {
      if (transaction) {
        await transaction('admins').insert(dados);
      } else {
        await this.Admins().insert(dados);
      }

      return true;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Falha ao criar usuário admin!');
    }
  }

  async getOne(id_admin: number) {
    try {
      let dados = await this.Admins()
        .select(
          'id_admin',
          'nome',
          'email',
          'senha',
          'telefone',
          'ultimo_login',
          'status',
          'data_cadastro',
          'data_ultima_atualizacao',
        )
        .where('id_admin', id_admin)
        .andWhere('status', 'A');

      return dados[0];
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Falha ao buscar admin específico!',
      );
    }
  }

  async getOneByEmail(email: string) {
    try {
      let dados = await this.Admins()
        .select(
          'id_admin',
          'nome',
          'email',
          'senha',
          'telefone',
          'ultimo_login',
          'status',
          'data_cadastro',
          'data_ultima_atualizacao',
        )
        .where('email', email)
        .andWhere('status', 'A');

      return dados[0];
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Falha ao buscar admin específico pelo nome!',
      );
    }
  }

  async getAll() {
    try {
      let dados = await this.Admins().select(
        'id_admin',
        'nome',
        'email',
        'senha',
        'telefone',
        'ultimo_login',
        'status',
        'data_cadastro',
        'data_ultima_atualizacao',
      );

      return dados;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Falha ao buscar todos admins!');
    }
  }

  async getAllAtivos() {
    try {
      let dados = await this.Admins()
        .select(
          'id_admin',
          'nome',
          'email',
          'senha',
          'telefone',
          'ultimo_login',
          'status',
          'data_cadastro',
          'data_ultima_atualizacao',
        )
        .where('STATUS', 'A');

      return dados;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Falha ao buscar todos admins ativos!',
      );
    }
  }

  async updateDadosAdmin(
    dados: Partial<admins>,
    id_admin: number,
    transaction: any = null,
  ) {
    try {
      if (transaction) {
        await transaction('admins').update(dados).where('id_admin', id_admin);
      } else {
        await this.Admins().update(dados).where('id_admin', id_admin);
      }

      return true;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Falha ao atualizar dados admin!');
    }
  }

  async updateInativaAdmin(id_admin: number, transaction: any = null) {
    try {
      if (transaction) {
        await transaction('admins')
          .update('STATUS', 'I')
          .where('id_admin', id_admin);
      } else {
        await this.Admins().update('STATUS', 'I').where('id_admin', id_admin);
      }

      return true;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Falha ao inativar admin!');
    }
  }
}
