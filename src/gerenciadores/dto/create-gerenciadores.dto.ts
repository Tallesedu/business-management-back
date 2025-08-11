import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  isEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateGerenciadoresDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  id_gerenciador: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  id_empresa: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255, {
    message: `O campo nome pode conter no máximo 255 caracteres`,
  })
  @ApiProperty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255, {
    message: `O campo email pode conter no máximo 255 caracteres`,
  })
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255, {
    message: `O campo senha pode conter no máximo 255 caracteres`,
  })
  @ApiProperty()
  senha: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20, {
    message: `O campo telefone pode conter no máximo 20 caracteres`,
  })
  @ApiProperty()
  telefone: string;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  ultimo_login: Date;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50, {
    message: `O campo status pode conter no máximo 50 caracteres`,
  })
  status: string;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  data_cadastro: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  data_ultima_atualizacao: Date;
}
