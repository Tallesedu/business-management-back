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
import { CreateGerenciadoreDto } from './dto/create-gerenciadore.dto';
import { UpdateGerenciadoreDto } from './dto/update-gerenciadore.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('gerenciadores')
export class GerenciadoresController {
  constructor(private readonly gerenciadoresService: GerenciadoresService) {}

  @Post()
  create(@Body() createGerenciadoreDto: CreateGerenciadoreDto) {
    return this.gerenciadoresService.create(createGerenciadoreDto);
  }

  @Get()
  findAll() {
    return this.gerenciadoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gerenciadoresService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGerenciadoreDto: UpdateGerenciadoreDto,
  ) {
    return this.gerenciadoresService.update(+id, updateGerenciadoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gerenciadoresService.remove(+id);
  }
}
