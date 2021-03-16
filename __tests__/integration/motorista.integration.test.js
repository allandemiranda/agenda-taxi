/* eslint-disable jest/expect-expect */
require('dotenv').config();
const request = require('supertest');
const express = require('../../src/index');
const Passageiro = require('../../src/models/passageiro.model');
const Motorista = require('../../src/models/motorista.model');
jest.setTimeout(10000);

describe('Integration Motorista', () => {
  const body = {
    nome: 'Teste B',
    email: 'teste.b@email.com',
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

  it('should create a motorista', async () => {
    await request(express.app)
      .post('/v2/motorista/')
      .send({ ...body })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);
  });

  it('should show all motoristas', async () => {
    await request(express.app)
      .get('/v2/motoristas/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});
