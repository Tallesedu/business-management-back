import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  isNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateAdminDto {
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  id_admin: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255, { message: 'O campo nome pode conter até 255 caracteres!' })
  @ApiProperty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255, { message: 'O campo email pode conter até 255 caracteres!' })
  @ApiProperty()
  email: string;

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

  @IsDate()
  @IsOptional()
  @ApiProperty()
  ultimo_login: Date;

  @IsString()
  @IsOptional()
  @MaxLength(50, { message: 'O campo status pode conter até 50 caracteres!' })
  @ApiProperty()
  status: string;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  data_cadastro: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  data_ultima_atualizacao: Date;
}
