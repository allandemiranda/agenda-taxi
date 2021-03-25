/* eslint-disable jest/expect-expect */
require('dotenv').config();
const request = require('supertest');
const express = require('../../src/index');
const Motorista = require('../../src/models/motorista.model');
const Passageiro = require('../../src/models/passageiro.model');
jest.setTimeout(100000);

describe('Integration Passageiro', () => {
  let bodyOne = {
    nome: 'Teste B',
    email: 'teste.b@email.com',
    marketing: true,
  };

  let bodyTwo = {
    nome: 'Teste C',
    email: 'teste.c@email.com',
    marketing: false,
  };

  let bodyThird = {
    nome: 'Teste D',
    email: 'teste.d@email.com',
    marketing: true,
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
      .send({ ...bodyOne })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then(response => {
        expect(response.body.passageiro).toEqual(
          expect.objectContaining(bodyOne),
        );
        bodyOne = { ...response.body.passageiro };
      });
  });

  it('should create a motorista', async () => {
    await request(express.app)
      .post('/v2/motorista/')
      .send({ ...bodyTwo })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then(response => {
        expect(response.body.motorista).toEqual(
          expect.objectContaining(bodyTwo),
        );
        bodyTwo = { ...response.body.motorista };
      });
  });

  it('should create a other motorista', async () => {
    await request(express.app)
      .post('/v2/motorista/')
      .send({ ...bodyThird })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then(response => {
        expect(response.body.motorista).toEqual(
          expect.objectContaining(bodyThird),
        );
        bodyThird = { ...response.body.motorista };
      });
  });

  it('should send a maketing email', async () => {
    await request(express.app)
      .post('/v2/marketing/')
      .send({ ...bodyThird })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then(response => {
        expect(response.body.msg).toEqual(
          'Email enviado aos passageiros e aos motoristas !',
        );
        expect(response.body.passageiros).toHaveLength(1);
        expect(response.body.motoristas).toHaveLength(1);
      });
  });

  it('should send a maketing null email', async () => {
    process.env.EMAIL_MARKEING = '';
    await request(express.app)
      .post('/v2/marketing/')
      .send({ ...bodyThird })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500);
  });
});
