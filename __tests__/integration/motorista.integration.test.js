/* eslint-disable jest/expect-expect */
require('dotenv').config();
const request = require('supertest');
const express = require('../../src/index');

describe('Integration Motorista', () => {
  const body = {
    nome: 'Teste B',
    email: 'teste.b@email.com',
    marketing: true,
  };

  beforeAll(async () => {});

  afterAll(async () => {
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
