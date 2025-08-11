import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';
import {
  IsString,
  IsInt,
  Length,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsEmail,
} from 'class-validator';

export class TokenPayload {
  @ApiProperty({ default: 'login-email' })
  @IsEmail()
  @IsNotEmpty({
    message: 'O campo EMAIL não pode ser vazio',
  })
  @MaxLength(255, {
    message: 'Tamanho incorreto para o campo EMAIL',
  })
  @Transform(({ value }) =>
    value.replace(/[\']/g, '').replace(/\%/g, '').replace(/\\/g, ''),
  )
  email: string;

  @ApiProperty({ default: 'senha' })
  @IsString()
  @IsNotEmpty({
    message: 'O campo SENHA não pode ser vazio',
  })
  @MaxLength(100, {
    message: 'Tamanho incorreto para o campo SENHA',
  })
  senha: string;
}
