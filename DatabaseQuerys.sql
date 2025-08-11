CREATE TABLE empresas (
    id_empresa SERIAL PRIMARY KEY,
    razao_social VARCHAR(255) NOT NULL,
    nome_fantasia VARCHAR(255),
    cnpj CHAR(14) UNIQUE NOT NULL,
    inscricao_estadual VARCHAR(30),
    inscricao_municipal VARCHAR(30),
    cnae_principal VARCHAR(7),
    data_abertura DATE,
    natureza_juridica VARCHAR(100),
    porte VARCHAR(50),
    situacao_cadastral VARCHAR(50) DEFAULT 'A',
    regime_tributario VARCHAR(50),
    aliquota_iss NUMERIC(5,2),
    aliquota_icms NUMERIC(5,2),
    aliquota_irpj NUMERIC(5,2),
    aliquota_csll NUMERIC(5,2),
    status VARCHAR(50) DEFAULT 'A',
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_ultima_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    observacoes TEXT
);

CREATE TABLE empresa_cnaes_secundarios (
    id_cnae SERIAL PRIMARY KEY,
    id_empresa INT NOT NULL REFERENCES empresas(id_empresa) ON DELETE CASCADE,
    cnae VARCHAR(7) NOT NULL,
    descricao VARCHAR(255),
    status VARCHAR(50) DEFAULT 'A'
);

CREATE TABLE enderecos (
    id_endereco SERIAL PRIMARY KEY,
    id_empresa INT NOT NULL REFERENCES empresas(id_empresa) ON DELETE CASCADE,
    logradouro VARCHAR(255),
    numero VARCHAR(20),
    complemento VARCHAR(255),
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    uf CHAR(2),
    cep CHAR(8),
    pais VARCHAR(100) DEFAULT 'Brasil',
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    status VARCHAR(50) DEFAULT 'A'
);

CREATE TABLE contatos (
    id_contato SERIAL PRIMARY KEY,
    id_empresa INT NOT NULL REFERENCES empresas(id_empresa) ON DELETE CASCADE,
    telefone_principal VARCHAR(20),
    telefone_secundario VARCHAR(20),
    email_principal VARCHAR(255),
    email_financeiro VARCHAR(255),
    site VARCHAR(255),
    redes_sociais JSONB,
    status VARCHAR(50) DEFAULT 'A'
);

CREATE TABLE socios (
    id_socio SERIAL PRIMARY KEY,
    id_empresa INT NOT NULL REFERENCES empresas(id_empresa) ON DELETE CASCADE,
    nome VARCHAR(255) NOT NULL,
    cpf CHAR(11) NOT NULL,
    cargo VARCHAR(100),
    percentual_participacao NUMERIC(5,2),
    data_entrada DATE,
    data_saida DATE,
    status VARCHAR(50) DEFAULT 'A'
);

CREATE TABLE contas_bancarias (
    id_conta SERIAL PRIMARY KEY,
    id_empresa INT NOT NULL REFERENCES empresas(id_empresa) ON DELETE CASCADE,
    banco VARCHAR(100),
    agencia VARCHAR(20),
    conta VARCHAR(30),
    tipo_conta VARCHAR(20),
    pix VARCHAR(255),
    status VARCHAR(50) DEFAULT 'A'
);

CREATE TABLE documentos (
    id_documento SERIAL PRIMARY KEY,
    id_empresa INT NOT NULL REFERENCES empresas(id_empresa) ON DELETE CASCADE,
    tipo_documento VARCHAR(100) NOT NULL,
    url_arquivo TEXT NOT NULL,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    validade DATE,
    status VARCHAR(50) DEFAULT 'A'
);

CREATE TABLE admins (
    id_admin SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    telefone VARCHAR(20),
    ultimo_login TIMESTAMP,
    status VARCHAR(50) DEFAULT 'A',
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_ultima_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE gerenciadores (
    id_gerenciador SERIAL PRIMARY KEY,
    id_empresa INT NOT NULL REFERENCES empresas(id_empresa) ON DELETE CASCADE,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    telefone VARCHAR(20),
    ultimo_login TIMESTAMP,
    status VARCHAR(50) DEFAULT 'A',
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_ultima_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
