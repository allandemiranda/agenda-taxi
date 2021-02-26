# Projeto WEB II - Agenda Taxi

Seviço de gerenciamento de email do aplicativo de Agenda de Taxi

Desenvolvido  por   [Allan de Miranda](https://github.com/allandemiranda)

25 de fevereiro de 2021 - Web II - IMD

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