import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAdminDto } from './create-admin.dto';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateAdminDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255, { message: 'O campo nome pode conter até 255 caracteres!' })
  @ApiProperty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255, { message: 'O campo senha pode conter até 255 caracteres!' })
  @ApiProperty()
  senha: string;

  @IsString()
  @IsOptional()
  @MaxLength(20, { message: 'O campo telefone pode conter até 20 caracteres!' })
  @ApiProperty()
  telefone: string;
}
