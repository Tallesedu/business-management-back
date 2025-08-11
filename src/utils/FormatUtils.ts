import {
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { isString } from 'class-validator';
import { jwtDecode } from 'jwt-decode';
import { mimiTypesToExtention } from './extationsMIMETypes';

const extractJWTFromHeaderLogin = (header) => {
  try {
    const dados: any = jwtDecode(header.authorization);
    return dados.login;
  } catch (err) {
    throw new UnauthorizedException(
      'Falha de autenticação: token inválido ou não enviado 1 ',
    );
  }
};

const extractJWTFromHeaderLoginAdmin = (header) => {
  try {
    const dados: any = jwtDecode(header.authorization);
    return dados.login;
  } catch (err) {
    return '';
  }
};

const extractJWTFromHeaderAdmin = (header) => {
  try {
    const dados: any = jwtDecode(header.authorization);
    return dados.admin;
  } catch (err) {
    return '';
  }
};

const extractJWTFromHeaderTipo = (header) => {
  try {
    const dados: any = jwtDecode(header.authorization);
    return dados.tipo;
  } catch (err) {
    throw new UnauthorizedException(
      'Falha de autenticação: token inválido ou não enviado 3',
    );
  }
};

const extractJWTFromHeaderCpf = (header) => {
  try {
    const dados: any = jwtDecode(header.authorization);
    return dados.cpf;
  } catch (err) {
    throw new UnauthorizedException(
      'Falha de autenticação: token inválido ou não enviado 4',
    );
  }
};

function FormatBase64(base64: string) {
  const match = base64.match(/^data:([a-z]+)\/([a-z0-9.-]+);base64,(.+)$/);

  if (!match) {
    return null;
  }

  const [, mimeType, fileExtension, base64Content] = match;

  const extension = mimiTypesToExtention(`${mimeType}/${fileExtension}`);

  const content = Buffer.from(base64Content, 'base64');

  return { mimeType, extension, content };
}

function getDateNum() {
  const data = new Date();
  return (
    data.getFullYear().toString() +
    (data.getMonth() + 1).toString() +
    data.getDate().toString() +
    data.getHours().toString() +
    data.getMinutes().toString() +
    data.getSeconds().toString()
  );
}

function formatNumberString(inputString: any) {
  if (inputString) {
    let formattedString = inputString;
    if (inputString.startsWith(',')) {
      formattedString = '0' + inputString;
    }
    return formattedString;
  } else {
    return '0';
  }
}

function getValorTotal(
  valorUnitario: string,
  desc: string | null,
  adc: string | null,
): string {
  let valorTotal = parseFloat(valorUnitario.replace(',', '.'));
  if (desc) {
    desc = desc.replace(',', '.');
    valorTotal -= parseFloat(desc);
  }
  if (adc) {
    adc = adc.replace(',', '.');
    valorTotal += parseFloat(adc);
  }
  return valorTotal.toString().replace('.', ',');
}

function formatDate(data: string): string {
  if (!data) {
    return null;
  }
  const date = new Date(data);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function transformKeysToLowercase(result) {
  return result.map((row) => {
    const newRow = {};
    for (const key in row) {
      newRow[key.toLowerCase()] = row[key];
    }
    return newRow;
  });
}

function isNonEmptyObject(value) {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.keys(value).length > 0
  );
}

function filterUndefinedOrNull(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value !== undefined && value !== null,
    ),
  );
}

function validateUpdateDate(obj: any) {
  if (obj.hasOwnProperty('centro_custo')) {
    throw new BadRequestException('Não é possivel editar o centro de custo');
  }
}

function removeAccents(s) {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase();
}

function numberStringToFloat(numero: string) {
  if (!numero) return 0;
  return parseFloat(numero.replace('.', '').replace(',', '.'));
}

function floatToNumberRealString(numero: number | string) {
  numero = isString(numero) ? numberStringToFloat(numero) : numero;
  return numero.toLocaleString('pt-BR', {
    style: 'decimal',
    minimumFractionDigits: 2,
    currency: 'BRL',
  });
}

function floatToCurrencyString(numero: number | string) {
  if (!numero) {
    numero = 0;
  } else if (isString(numero)) {
    numero = numberStringToFloat(numero);
  }
  return numero.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

function generateInicials(nome: string): string {
  return nome
    .split(' ')
    .filter((parte) => parte)
    .map((parte) => parte[0].toUpperCase())
    .join('');
}

function montaCpfCnpj(dados: string | null): string {
  function insertAt(str: string, index: number, insert: string): string {
    return str.slice(0, index) + insert + str.slice(index);
  }

  if (!dados) {
    dados = '';
  }

  switch (dados.length) {
    case 11:
      dados = insertAt(dados, dados.length - 2, '-');
      dados = insertAt(dados, dados.length - 6, '.');
      dados = insertAt(dados, dados.length - 10, '.');
      break;
    case 14:
      dados = insertAt(dados, dados.length - 2, '-');
      dados = insertAt(dados, dados.length - 7, '/');
      dados = insertAt(dados, dados.length - 11, '.');
      dados = insertAt(dados, dados.length - 15, '.');
      break;
  }

  return dados;
}

function checkObjectAndReturnOnlyPropertiesWithValues(
  object: Record<string, string | number | null | any>,
) {
  const objReturn = {};

  Object.keys(object).forEach((key) => {
    if (object[key]) {
      objReturn[key] = object[key];
    }
  });

  return objReturn;
}

function roundUp(num, decimalPlaces) {
  const multiplier = Math.pow(10, decimalPlaces);
  return Math.ceil(num * multiplier) / multiplier;
}
function isNumericString(input: number) {
  return typeof input === 'string' && !Number.isNaN(input);
}

function preencherComZeros(valor, tamanho) {
  if (!!valor) {
    return valor.toString().padStart(tamanho, '0');
  } else {
    return ''.padStart(tamanho, '0');
  }
}

function removerMascaraCpfCnpj(documento: string): string {
  return documento.replace(/[^\d]/g, '');
}

function handleResponse(dados: any, message = 'Ação realizada com sucesso.') {
  const isEmptyObject =
    typeof dados === 'object' &&
    !Array.isArray(dados) &&
    Object.keys(dados).length === 0;

  const isEmptyArray = Array.isArray(dados) && dados.length === 0;

  if (!dados || isEmptyObject || isEmptyArray) {
    return {
      result: false,
      dados: Array.isArray(dados) ? [] : {},
      message: 'Nenhum dado encontrado.',
    };
  }

  return {
    result: true,
    dados,
    message: message,
  };
}

function handleError(context: string, error: any, message?: string) {
  console.error(`Erro ao ${context}:`, error);

  const errorMessage =
    message ||
    `Erro ao buscar ${context}. Por favor, tente novamente mais tarde.`;

  throw new InternalServerErrorException(errorMessage);
}

function handleBadResponse(message: string) {
  return {
    result: false,
    dados: [],
    message: message,
  };
}

function parseDateTimeStringToLocal(dateTimeStr: string): Date {
  const [datePart, timePart] = dateTimeStr.split(' ');
  if (!datePart || !timePart) {
    throw new Error(
      'Formato de data inválido. Esperado: "YYYY-MM-DD HH:mm:ss"',
    );
  }

  const [year, month, day] = datePart.split('-').map(Number);
  const [hour, minute, second] = timePart.split(':').map(Number);

  return new Date(year, month - 1, day, hour, minute, second);
}

export {
  extractJWTFromHeaderLoginAdmin,
  isNonEmptyObject,
  handleBadResponse,
  checkObjectAndReturnOnlyPropertiesWithValues,
  extractJWTFromHeaderCpf,
  extractJWTFromHeaderLogin,
  extractJWTFromHeaderAdmin,
  extractJWTFromHeaderTipo,
  filterUndefinedOrNull,
  floatToCurrencyString,
  floatToNumberRealString,
  FormatBase64,
  formatDate,
  formatNumberString,
  generateInicials,
  getDateNum,
  getValorTotal,
  handleError,
  handleResponse,
  isNumericString,
  montaCpfCnpj,
  numberStringToFloat,
  preencherComZeros,
  removeAccents,
  removerMascaraCpfCnpj,
  roundUp,
  transformKeysToLowercase,
  validateUpdateDate,
  parseDateTimeStringToLocal,
};
