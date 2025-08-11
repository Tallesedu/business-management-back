import { BadRequestException } from "@nestjs/common";

function mimiTypesToExtention(mimeType: string): string {
    let retorno: string;
    switch (mimeType) {
        case "application/msword":
            retorno = `doc`;
            break;
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            retorno = `docx`;
            break;
        case "image/jpg":
            retorno = `jpg`;
            break;
        case "image/jpeg":
            retorno = `jpeg`;
            break;
        case "application/vnd.oasis.opendocument.text":
            retorno = `odt`;
            break;
        case "image/png":
            retorno = `png`;
            break;
        case "application/pdf":
            retorno = `pdf`;
            break;
        case "text/plain":
            retorno = `txt`;
            break;
        case "application/vnd.ms-excel":
            retorno = `xls`;
            break;
        case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
            retorno = `xlsx`;
            break;
        case "application/vnd.oasis.opendocument.spreadsheet":
            retorno = `ods`;
            break;
        case "application/vnd.oasis.opendocument.text":
            retorno = `odt`;
            break;
        default:
            throw new  BadRequestException("Tipo de arquivo não permitido");
    }
    return retorno;
}

export { mimiTypesToExtention };
