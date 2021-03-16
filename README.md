![v2](https://img.shields.io/badge/version-v2.0.0-blue) 

![Doc 100%](https://img.shields.io/badge/docs-100%25-brightgreen) ![MIT License](https://img.shields.io/badge/license-MIT-brightgreen) [![Build Status](https://travis-ci.com/allandemiranda/agenda-taxi.svg?branch=main)](https://travis-ci.com/allandemiranda/agenda-taxi)

![ExpressJS](https://img.shields.io/badge/ExpressJS-v4.17.1-green) ![Mongoose](https://img.shields.io/badge/Mongoose-v5.11.18-green) ![Nodemailer](https://img.shields.io/badge/Nodemailer-v6.4.18-green)

![Eslint](https://img.shields.io/badge/Eslint-v7.20.0-green) ![Prettier](https://img.shields.io/badge/Prettier-v2.2.1-green)

![Docker](https://shields.io/badge/-Docker-blue) ![Swagger](https://shields.io/badge/-Swagger-brightgreen)

# Projeto WEB II - Agenda Taxi

Seviço de gerenciamento de email do aplicativo Agenda Taxi - V2

Desenvolvido  por   [Allan de Miranda](https://www.linkedin.com/in/allandemiranda/)

25 de fevereiro de 2021 - Web II - IMD

Atualização da versão:

- Novas Histórias de Usuários

- Novos EndPoints

## Introdução

Desenvolva um projeto seguindo os requisitos do capítulo 2.

Demais solicitações do projeto encontra-se no arquivo `Projeto.docx` na raiz do projeto.

## Inicializar

Certifique de ter instalado o [Docker](https://docs.docker.com/engine/install/) e [Docker Compose](https://docs.docker.com/compose/install/) em sua máquina.

Na raiz do projeto execute o comando:

```
docker-compose up -d
```

Com o contêiner taxi-docker rodando, consuma a plicação pela url ``http://localhost:5000/``

### Note:

- O arquivo `.env` necessita ser criado, para isso:

1 - Já existe um arquivo exempro na raiz do projeto `.env.example`.

2 - Renomei o arquivo para `.env`.

3 - Solicite ao aluno desenvolvedor a chave de conexão com o banco de dados.

4 - Adicione a chave ao campo `MONGO_HOST`.

5 - Se já estiver rodando o contêiner com a aplicação, reeinicie ela.

## Documentação

Toda documentação está disponível na url ``http://localhost:8080`` do contêiner swagger-ui. 

## Histórias de Usuários

Como motorista particular, desejo me cadastrar no aplicativo, para receber propostas de corridas dos passageiros.

Como motorista do aplicativo, desejo editar meu cadastro no aplicativo, para manter os dados atualizados.

Como motorista do aplicativo, desejo me excluir do aplicativo, para não receber mais emails.

Como motorista do aplicativo, desejo informar ao passageiro que aceitei a corrida, para ele poder saber da atualização do pedido dele.

Como motorista do aplicativo, desejo informar ao financeiro do aplicativo que aceitei uma corrida, para ser gerado a cobrança ao passageiro do aplicativo.

Como passageiro livre, desejo me cadastrar no aplicativo, para solicitar uma corrida a um motorista do aplicativo.

Como passageiro do aplicativo, desejo editar meu cadastro no aplicativo, para manter os dados atualizados.

Como passageiro do aplicativo, desejo me excluir do aplicativo, para não receber mais emails.

Como passageiro do aplicativo, desejo informar minha viagem, para algum motorista aceitar.

Como financeiro do aplicativo, desejo informar ao motorista do aplicativo o pagamento da corrida, para que ele possa fazer a corrida.

Como financeiro do aplicativo, desejo informar ao passageiro do aplicativo a confirmação do pagamento da corrida, para que ele se programe para a viagem.

Como marketing do aplicativo, desejo informar aos passageiros do aplicativo novidades, para que eles utilizem o aplicativo.

Como marketing do aplicativo, desejo informar aos motoristas do aplicativo novidades, para que eles utilizem o aplicativo.

## EndPoints

Motorista

```
GET ​/motorista​/{id_motorista}
Obter Motorista
```
```
PUT ​/motorista​/{id_motorista}
Editar Motorista
```
```
DELETE ​/motorista​/{id_motorista}
Deletar Motorista
```
```
GET ​/motoristas
Obter Motoristas
```
```
POST ​/motorista​/
Criar Motorista
```
```
POST ​/motorista​/{id_motorista}​/viagem​/{id_viagem}
Aceitar Viagem
```

Passageiro

```
GET ​/passageiro​/{id_passageiro}
Obter Passageiro
```
```
PUT ​/passageiro​/{id_passageiro}
Editar Passageiro
```
```
DELETE ​/passageiro​/{id_passageiro}
Deletar Passageiro
```
```
GET ​/passageiros​/
Obter Passageiros
```
```
POST ​/passageiro​/
Criar Passageiro
```
```
POST ​/passageiro​/{id_passageiro}​/viagem
Solicitar Viagem
```

Financeiro

```
POST ​/financeiro​/{id_viagem}
Financeiro Email
```

Marketing

```
POST ​/marketing
Marketing Email
```