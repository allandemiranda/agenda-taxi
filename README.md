![v2](https://img.shields.io/badge/version-v3.0.0-blue) 

![Doc 100%](https://img.shields.io/badge/docs-100%25-brightgreen) ![MIT License](https://img.shields.io/badge/license-MIT-brightgreen) [![Build Status](https://travis-ci.com/allandemiranda/agenda-taxi.svg?branch=main)](https://travis-ci.com/allandemiranda/agenda-taxi) [![Node.js CI](https://github.com/allandemiranda/agenda-taxi/actions/workflows/node.js.yml/badge.svg)](https://github.com/allandemiranda/agenda-taxi/actions/workflows/node.js.yml)

![ExpressJS](https://img.shields.io/badge/ExpressJS-v4.17.1-green) ![Mongoose](https://img.shields.io/badge/Mongoose-v5.11.18-green) ![Nodemailer](https://img.shields.io/badge/Nodemailer-v6.4.18-green)

![Eslint](https://img.shields.io/badge/Eslint-v7.20.0-green) ![Prettier](https://img.shields.io/badge/Prettier-v2.2.1-green) ![Prettier](https://camo.githubusercontent.com/48a41f43affa2e6253d6a48e0ee662ec53ce13c46442ac815e81d36b6e6b434d/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f636f64655f7374796c652d70726574746965722d6666363962342e737667)

![Docker](https://shields.io/badge/-Docker-blue) ![Swagger](https://shields.io/badge/-Swagger-brightgreen) 

# Projeto WEB II - Agenda Taxi

Seviço de gerenciamento de email do aplicativo Agenda Taxi - V3

Desenvolvido  por   [Allan de Miranda](https://www.linkedin.com/in/allandemiranda/)

25 de fevereiro de 2021 - Web II - IMD

Atualização da versão:

- Telemetria

- Tracing para 86% das rotas

- Testes em 100% das rotas

- Correções de EndPoints

## Introdução

Desenvolva um projeto seguindo os requisitos do capítulo 2.

## Inicializar

Certifique de ter instalado o [Docker](https://docs.docker.com/engine/install/) e [Docker Compose](https://docs.docker.com/compose/install/) em sua máquina.

Na raiz do projeto execute o comando:

```
docker-compose up -d
```

Com o contêiner taxi-docker rodando, consuma a plicação pela url ``http://localhost:5000/``

### Note:

1 - Solicite ao aluno desenvolvedor a chave de conexão com o banco de dados.

2 - Adicione a chave ao campo `MONGO_HOST`.

3 - Se já estiver rodando o contêiner com a aplicação, reeinicie ela.

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
