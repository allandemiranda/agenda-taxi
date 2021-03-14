/* eslint-disable jest/expect-expect */
require('dotenv').config();
const request = require('supertest');
const express = require('../../src/index');

describe('Integration Passageiro', () => {
  const body = {
    nome: 'Teste A',
    email: 'teste.a@email.com',
    marketing: true,
  };

  beforeAll(async () => {});

  afterAll(async () => {
    await express.server.close();
  });

  it('should create a passageiro', async () => {
    await request(express.app)
      .post('/v2/passageiro/')
      .send({ ...body })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);
  });

  it('should show all passageiros', async () => {
    await request(express.app)
      .get('/v2/passageiros/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});
