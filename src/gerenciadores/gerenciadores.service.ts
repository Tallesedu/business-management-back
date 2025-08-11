import { Injectable } from '@nestjs/common';
import { CreateGerenciadoreDto } from './dto/create-gerenciadore.dto';
import { UpdateGerenciadoreDto } from './dto/update-gerenciadore.dto';

@Injectable()
export class GerenciadoresService {
  create(createGerenciadoreDto: CreateGerenciadoreDto) {
    return 'This action adds a new gerenciadore';
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

  remove(id: number) {
    return `This action removes a #${id} gerenciadore`;
  }
}
