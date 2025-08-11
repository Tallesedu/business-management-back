import { PartialType } from '@nestjs/swagger';
import { CreateGerenciadoreDto } from './create-gerenciadore.dto';

export class UpdateGerenciadoreDto extends PartialType(CreateGerenciadoreDto) {}
