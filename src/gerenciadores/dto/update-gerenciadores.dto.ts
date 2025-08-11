import { PartialType } from '@nestjs/swagger';
import { CreateGerenciadoresDto } from './create-gerenciadores.dto';

export class UpdateGerenciadoreDto extends PartialType(
  CreateGerenciadoresDto,
) {}
