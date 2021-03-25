/* eslint-disable jest/expect-expect */
require('dotenv').config();
const request = require('supertest');
const express = require('../../src/index');
const Motorista = require('../../src/models/motorista.model');
const Passageiro = require('../../src/models/passageiro.model');
jest.setTimeout(100000);

describe('Integration Passageiro', () => {
  let passageiro = {
    nome: 'Teste B',
    email: 'teste.b@email.com',
    marketing: true,
  };

  let motorista = {
    nome: 'Teste C',
    email: 'teste.c@email.com',
    marketing: false,
  };

  let viagem = {
    origem: 'Local A',
    destino: 'Local B',
  };

  beforeAll(async () => {
    await Passageiro.deleteMany({});
    await Motorista.deleteMany({});
  });

  afterAll(async () => {
    await Passageiro.deleteMany({});
    await Motorista.deleteMany({});
    await express.server.close();
  });

  it('should create a passageiro', async () => {
    await request(express.app)
      .post('/v2/passageiro/')
      .send({ ...passageiro })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then(response => {
        expect(response.body.passageiro).toEqual(
          expect.objectContaining(passageiro),
        );
        passageiro = { ...response.body.passageiro };
      });
  });

  it('should create a motorista', async () => {
    await request(express.app)
      .post('/v2/motorista/')
      .send({ ...motorista })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then(response => {
        expect(response.body.motorista).toEqual(
          expect.objectContaining(motorista),
        );
        motorista = { ...response.body.motorista };
      });
  });

  it('should create a viagem by fake id passageiro', async () => {
    await request(express.app)
      .post('/v2/passageiro/' + '000000000000000000000000' + '/viagem/')
      .send({ ...viagem })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(response => {
        expect(response.body.error).toBe('Passageiro deletado');
      });
  });

  it('should create a viagem by wrong id passageiro', async () => {
    await request(express.app)
      .post('/v2/passageiro/' + 'wrongID' + '/viagem/')
      .send({ ...viagem })
      .set('Accept', 'application/json')
      .expect(500);
  });

  it('should create a viagem by id passageiro sending a app null email', async () => {
    const email = process.env.EMAIL_APP;
    process.env.EMAIL_APP = '';
    await request(express.app)
      .post('/v2/passageiro/' + passageiro._id + '/viagem/')
      .send({ ...viagem })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500);
    process.env.EMAIL_APP = email;
  });

  it('should create a viagem by id passageiro', async () => {
    await request(express.app)
      .post('/v2/passageiro/' + passageiro._id + '/viagem/')
      .send({ ...viagem })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then(response => {
        expect(response.body.viagem).toEqual(expect.objectContaining(viagem));
        expect(response.body.viagem.passageiro).toEqual(
          expect.objectContaining(passageiro),
        );
        viagem = { ...response.body.viagem };
      });
  });

  it('should financeiro send a email confirming payment by id without motorista', async () => {
    await request(express.app)
      .post('/v2/financeiro/' + viagem._id)
      .send({ valor: 99.99 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(response => {
        expect(response.body.error).toBe('Viagem sem motorista');
      });
  });

  it('should acept a viagem by id motorista and viagem sending a app null email', async () => {
    const email = process.env.EMAIL_APP;
    process.env.EMAIL_APP = '';
    await request(express.app)
      .post('/v2/motorista/' + motorista._id + '/viagem/' + viagem._id)
      .send({ valor: 99.99 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500);
    process.env.EMAIL_APP = email;
  });

  it('should acept a viagem by id motorista and fake viagem', async () => {
    await request(express.app)
      .post(
        '/v2/motorista/' +
          motorista._id +
          '/viagem/' +
          '000000000000000000000000',
      )
      .send({ valor: 99.99 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(response => {
        expect(response.body.error).toBe('Viagem não existe');
      });
  });

  it('should acept a viagem by id fake motorista and viagem', async () => {
    await request(express.app)
      .post(
        '/v2/motorista/' + '000000000000000000000000' + '/viagem/' + viagem._id,
      )
      .send({ valor: 99.99 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(response => {
        expect(response.body.error).toBe('Motorista não existe');
      });
  });

  it('should acept a viagem by id motorista and viagem', async () => {
    await request(express.app)
      .post('/v2/motorista/' + motorista._id + '/viagem/' + viagem._id)
      .send({ valor: 99.99 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then(response => {
        expect(response.body.msg).toEqual(
          'Email enviado ao passageiro ' +
            viagem.passageiro.nome +
            ' e ao financeiro!',
        );
        expect(response.body.viagem.origem).toEqual(viagem.origem);
        expect(response.body.viagem.destino).toEqual(viagem.destino);
        expect(response.body.viagem.valor).toEqual(99.99);
        expect(response.body.viagem.passageiro).toEqual(
          expect.objectContaining(passageiro),
        );
        expect(response.body.viagem.motorista).toEqual(
          expect.objectContaining(motorista),
        );
        viagem = { ...response.body.viagem };
      });
  });

  it('should financeiro send a email confirming payment by id viagem', async () => {
    await request(express.app)
      .post('/v2/financeiro/' + viagem._id)
      .send({ valor: 99.99 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then(response => {
        expect(response.body.msg).toEqual(
          'Email enviado ao passageiro ' +
            viagem.passageiro.nome +
            ' e ao motorista ' +
            viagem.motorista.nome +
            ' sobre a confirmação do pagamento !',
        );
        expect(response.body.passageiro).toEqual(
          expect.objectContaining(passageiro),
        );
        expect(response.body.motorista).toEqual(
          expect.objectContaining(motorista),
        );
      });
  });

  it('should financeiro send a email confirming payment by id viagem sending a financeiro null email', async () => {
    const email = process.env.EMAIL_FINANCEIRO;
    process.env.EMAIL_FINANCEIRO = '';
    await request(express.app)
      .post('/v2/financeiro/' + viagem._id)
      .send({ valor: 99.99 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500);
    process.env.EMAIL_FINANCEIRO = email;
  });

  it('should financeiro send a email confirming payment by id wrong viagem id', async () => {
    await request(express.app)
      .post('/v2/financeiro/' + 'wrongID')
      .send({ valor: 99.99 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500);
  });

  it('should financeiro send a email confirming payment by id fake viagem id', async () => {
    await request(express.app)
      .post('/v2/financeiro/' + '000000000000000000000000')
      .send({ valor: 99.99 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(response => {
        expect(response.body.error).toBe('Viagem não existe');
      });
  });

  it('should acept a viagem by id fake motorista and viagem without a passageiro', async () => {
    await request(express.app)
      .delete('/v2/passageiro/' + passageiro._id)
      .set('Accept', 'application/json')
      .expect('Content-Length', '0')
      .expect(200);

    await request(express.app)
      .post('/v2/motorista/' + motorista._id + '/viagem/' + viagem._id)
      .send({ valor: 99.99 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(response => {
        expect(response.body.error).toBe('Passageiro não existe');
      });
  });

  it('should financeiro send a email confirming payment by id deleted passageiro id', async () => {
    await request(express.app)
      .post('/v2/financeiro/' + viagem._id)
      .send({ valor: 99.99 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(response => {
        expect(response.body.error).toBe('Passageiro deletado');
      });
  });

  it('should financeiro send a email confirming payment by id deleted motorista id', async () => {
    await request(express.app)
      .delete('/v2/motorista/' + motorista._id)
      .set('Accept', 'application/json')
      .expect('Content-Length', '0')
      .expect(200);

    await request(express.app)
      .post('/v2/financeiro/' + viagem._id)
      .send({ valor: 99.99 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(response => {
        expect(response.body.error).toBe('Viagem sem motorista');
      });
  });
});
