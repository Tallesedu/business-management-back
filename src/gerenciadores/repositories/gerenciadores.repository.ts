import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { gerenciadores } from '../entities/gerenciadores.entity';

@Injectable()
export class GerenciadoresRepository {
  private readonly Gerenciadores = () =>
    this.knex<gerenciadores>('gerenciadores');

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

  async createGerenciador(
    dados: Partial<gerenciadores>,
    transaction: any = null,
  ) {
    try {
      if (transaction) {
        await transaction('gerenciadores').insert(dados);
      } else {
        await this.Gerenciadores().insert(dados);
      }

      return true;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Falha ao criar novo Gerenciador!',
      );
    }
  }
}
