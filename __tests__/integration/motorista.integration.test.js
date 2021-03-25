/* eslint-disable jest/expect-expect */
require('dotenv').config();
const request = require('supertest');
const express = require('../../src/index');
const Motorista = require('../../src/models/motorista.model');
const Passageiro = require('../../src/models/passageiro.model');
jest.setTimeout(10000);

describe('Integration Motorista', () => {
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

  const bodyWrongOne = {
    nome: true,
    email: 'email@email',
    marketing: true,
  };

  const bodyWrongTwo = {
    nome: 'Teste D',
    email: true,
    marketing: true,
  };

  const bodyWrongThird = {
    nome: 'Teste D',
    email: 'email@email',
    marketing: 'email@email',
  };

  const bodyWrongNull = {
    nome: 'Teste D',
    email: 'email@email',
    marketing: 'email@email',
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
      .send({ ...bodyOne })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then(response => {
        expect(response.body.motorista).toEqual(
          expect.objectContaining(bodyOne),
        );
        bodyOne = { ...response.body.motorista };
      });
  });

  it('should create a existent motorista', async () => {
    await request(express.app)
      .post('/v2/motorista/')
      .send({ ...bodyOne })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(response => {
        expect(response.body.error).toBe('Motorista existente');
      });
  });

  it('should create a wrong motorista nome', async () => {
    await request(express.app)
      .post('/v2/motorista/')
      .send({ ...bodyWrongOne })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(response => {
        expect(response.body.error).toBe('Dados incorreto');
      });
  });

  it('should create a wrong motorista email', async () => {
    await request(express.app)
      .post('/v2/motorista/')
      .send({ ...bodyWrongTwo })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(response => {
        expect(response.body.error).toBe('Dados incorreto');
      });
  });

  it('should create a wrong motorista marketing', async () => {
    await request(express.app)
      .post('/v2/motorista/')
      .send({ ...bodyWrongThird })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(response => {
        expect(response.body.error).toBe('Dados incorreto');
      });
  });

  it('should create a wrong motorista null', async () => {
    await request(express.app)
      .post('/v2/motorista/')
      .send({ ...bodyWrongNull })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(response => {
        expect(response.body.error).toBe('Dados incorreto');
      });
  });

  it('should create a wrong motorista email fake', async () => {
    await request(express.app)
      .post('/v2/motorista/')
      .send({ email: { email: true } })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500);
  });

  it('should show all motorista', async () => {
    await request(express.app)
      .get('/v2/motoristas/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body.motoristas).toHaveLength(1);
      });
  });

  it('should show a motorista by id', async () => {
    await request(express.app)
      .get('/v2/motorista/' + bodyOne._id)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body.motorista).toEqual(
          expect.objectContaining(bodyOne),
        );
      });
  });

  it('should show a motorista by fake id', async () => {
    await request(express.app)
      .get('/v2/motorista/' + '000000000000000000000000')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(response => {
        expect(response.body.error).toBe('Motorista não existe');
      });
  });

  it('should show a motorista by wrong id', async () => {
    await request(express.app)
      .get('/v2/motorista/' + 'wrongID')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500);
  });

  it('should edit a motorista by fake id', async () => {
    await request(express.app)
      .put('/v2/motorista/' + '000000000000000000000000')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(response => {
        expect(response.body.error).toBe('Motorista não existe');
      });
  });

  it('should edit a motorista by wrong id', async () => {
    await request(express.app)
      .put('/v2/motorista/' + 'wrongID')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500);
  });

  it('should edit a motorista nome by id', async () => {
    await request(express.app)
      .put('/v2/motorista/' + bodyOne._id)
      .send({ nome: bodyTwo.nome })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then(response => {
        expect(response.body.motorista.nome).toEqual(bodyTwo.nome);
        expect(response.body.motorista.email).toEqual(bodyOne.email);
        expect(response.body.motorista.marketing).toEqual(bodyOne.marketing);
        bodyOne = { ...response.body.motorista };
      });
  });

  it('should edit a motorista email by id', async () => {
    await request(express.app)
      .put('/v2/motorista/' + bodyOne._id)
      .send({ email: bodyTwo.email })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then(response => {
        expect(response.body.motorista.nome).toEqual(bodyOne.nome);
        expect(response.body.motorista.email).toEqual(bodyTwo.email);
        expect(response.body.motorista.marketing).toEqual(bodyOne.marketing);
        bodyOne = { ...response.body.motorista };
      });
  });

  it('should edit a motorista marketing by id', async () => {
    await request(express.app)
      .put('/v2/motorista/' + bodyOne._id)
      .send({ marketing: bodyTwo.marketing })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then(response => {
        expect(response.body.motorista.nome).toEqual(bodyOne.nome);
        expect(response.body.motorista.email).toEqual(bodyOne.email);
        expect(response.body.motorista.marketing).toEqual(bodyTwo.marketing);
        bodyOne = { ...response.body.motorista };
      });
  });

  it('should edit a motorista by id', async () => {
    await request(express.app)
      .put('/v2/motorista/' + bodyOne._id)
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

  it('should delete a motorista by fake id', async () => {
    await request(express.app)
      .delete('/v2/motorista/' + '000000000000000000000000')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(response => {
        expect(response.body.error).toBe('Motorista não existe');
      });
  });

  it('should delete a motorista by wrong id', async () => {
    await request(express.app)
      .delete('/v2/motorista/' + 'wrongID')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500);
  });

  it('should delete a motorista by id', async () => {
    await request(express.app)
      .delete('/v2/motorista/' + bodyThird._id)
      .set('Accept', 'application/json')
      .expect('Content-Length', '0')
      .expect(200);
  });
});
