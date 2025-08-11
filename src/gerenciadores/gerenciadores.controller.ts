import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GerenciadoresService } from './gerenciadores.service';
import { CreateGerenciadoresDto } from './dto/create-gerenciadores.dto';
import { UpdateGerenciadoreDto } from './dto/update-gerenciadores.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('gerenciadores')
export class GerenciadoresController {
  constructor(private readonly gerenciadoresService: GerenciadoresService) {}

  @Post('/criar-gerenciador/')
  create(@Body() createGerenciadoreDto: CreateGerenciadoresDto) {
    return this.gerenciadoresService.create(createGerenciadoreDto);
  }

  @Get('/get-all-gerenciadores/')
  findAll() {
    return this.gerenciadoresService.findAll();
  }

  @Get('/get-gerenciador/:id')
  findOne(@Param('id') id: string) {
    return this.gerenciadoresService.findOne(+id);
  }

  @Patch('/atualizar-gerenciador/:id')
  update(
    @Param('id') id: string,
    @Body() updateGerenciadoreDto: UpdateGerenciadoreDto,
  ) {
    return this.gerenciadoresService.update(+id, updateGerenciadoreDto);
  }
}
