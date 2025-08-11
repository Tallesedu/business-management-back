import { Injectable } from '@nestjs/common';
import { CreateGerenciadoresDto } from './dto/create-gerenciadores.dto';
import { UpdateGerenciadoreDto } from './dto/update-gerenciadores.dto';
import { GerenciadoresRepository } from './repositories/gerenciadores.repository';
import { handleError } from 'src/utils/FormatUtils';
import { GerenciadoresFactory } from './factories/gerenciadores.factory';

@Injectable()
export class GerenciadoresService {
  constructor(
    private readonly gerenciadoresRepository: GerenciadoresRepository,
    private readonly gerenciadoresFactory: GerenciadoresFactory,
  ) {}
  async create(createGerenciadoreDto: CreateGerenciadoresDto) {
    const transaction = await this.gerenciadoresRepository.openTransaction();

    try {
      const dadosInsert =
        await this.gerenciadoresFactory.createGerenciadoresFactory(
          createGerenciadoreDto,
        );
      await this.gerenciadoresRepository.createGerenciador(dadosInsert);
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.error(error);
      return handleError(
        'criar novo Gerenciador',
        error,
        'Falha ao criar novo Gerenciador!',
      );
    }
  }

  findAll() {
    return `This action returns all gerenciadores`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gerenciadore`;
  }

  update(id: number, updateGerenciadoreDto: UpdateGerenciadoreDto) {
    return `This action updates a #${id} gerenciadore`;
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
