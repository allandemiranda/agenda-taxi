/* eslint-disable jest/expect-expect */
require('dotenv').config();
const request = require('supertest');
const express = require('../../src/index');
const Motorista = require('../../src/models/motorista.model');
const Passageiro = require('../../src/models/passageiro.model');
jest.setTimeout(10000);

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

  it('should create a existent passageiro', async () => {
    await request(express.app)
      .post('/v2/passageiro/')
      .send({ ...bodyOne })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(response => {
        expect(response.body.error).toBe('Passageiro existe');
      });
  });

  it('should create a wrong passageiro nome', async () => {
    await request(express.app)
      .post('/v2/passageiro/')
      .send({ ...bodyWrongOne })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(response => {
        expect(response.body.error).toBe('Dados incorreto');
      });
  });

  it('should create a wrong passageiro email', async () => {
    await request(express.app)
      .post('/v2/passageiro/')
      .send({ ...bodyWrongTwo })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(response => {
        expect(response.body.error).toBe('Dados incorreto');
      });
  });

  it('should create a wrong passageiro marketing', async () => {
    await request(express.app)
      .post('/v2/passageiro/')
      .send({ ...bodyWrongThird })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(response => {
        expect(response.body.error).toBe('Dados incorreto');
      });
  });

  it('should create a wrong passageiro null', async () => {
    await request(express.app)
      .post('/v2/passageiro/')
      .send({ ...bodyWrongNull })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(response => {
        expect(response.body.error).toBe('Dados incorreto');
      });
  });

  it('should create a wrong passageiro email fake', async () => {
    await request(express.app)
      .post('/v2/passageiro/')
      .send({ email: { email: true } })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500);
  });

  it('should show all passageiro', async () => {
    await request(express.app)
      .get('/v2/passageiros/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body.passageiros).toHaveLength(1);
      });
  });

  it('should show a passageiro by id', async () => {
    await request(express.app)
      .get('/v2/passageiro/' + bodyOne._id)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body.passageiro).toEqual(
          expect.objectContaining(bodyOne),
        );
      });
  });

  it('should show a passageiro by fake id', async () => {
    await request(express.app)
      .get('/v2/passageiro/' + '000000000000000000000000')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(response => {
        expect(response.body.error).toBe('Passageiro não existe');
      });
  });

  it('should show a passageiro by wrong id', async () => {
    await request(express.app)
      .get('/v2/passageiro/' + 'wrongID')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500);
  });

  it('should edit a passageiro by fake id', async () => {
    await request(express.app)
      .put('/v2/passageiro/' + '000000000000000000000000')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(response => {
        expect(response.body.error).toBe('Passageiro não existe');
      });
  });

  it('should edit a passageiro by wrong id', async () => {
    await request(express.app)
      .put('/v2/passageiro/' + 'wrongID')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500);
  });

  it('should edit a passageiro nome by id', async () => {
    await request(express.app)
      .put('/v2/passageiro/' + bodyOne._id)
      .send({ nome: bodyTwo.nome })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then(response => {
        expect(response.body.passageiro.nome).toEqual(bodyTwo.nome);
        expect(response.body.passageiro.email).toEqual(bodyOne.email);
        expect(response.body.passageiro.marketing).toEqual(bodyOne.marketing);
        bodyOne = { ...response.body.passageiro };
      });
  });

  it('should edit a passageiro email by id', async () => {
    await request(express.app)
      .put('/v2/passageiro/' + bodyOne._id)
      .send({ email: bodyTwo.email })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then(response => {
        expect(response.body.passageiro.nome).toEqual(bodyOne.nome);
        expect(response.body.passageiro.email).toEqual(bodyTwo.email);
        expect(response.body.passageiro.marketing).toEqual(bodyOne.marketing);
        bodyOne = { ...response.body.passageiro };
      });
  });

  it('should edit a passageiro marketing by id', async () => {
    await request(express.app)
      .put('/v2/passageiro/' + bodyOne._id)
      .send({ marketing: bodyTwo.marketing })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then(response => {
        expect(response.body.passageiro.nome).toEqual(bodyOne.nome);
        expect(response.body.passageiro.email).toEqual(bodyOne.email);
        expect(response.body.passageiro.marketing).toEqual(bodyTwo.marketing);
        bodyOne = { ...response.body.passageiro };
      });
  });

  it('should edit a passageiro by id', async () => {
    await request(express.app)
      .put('/v2/passageiro/' + bodyOne._id)
      .send({ ...bodyThird })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then(response => {
        expect(response.body.passageiro).toEqual(
          expect.objectContaining(bodyThird),
        );
        bodyThird = { ...response.body.passageiro };
      });
  });

  it('should delete a passageiro by fake id', async () => {
    await request(express.app)
      .delete('/v2/passageiro/' + '000000000000000000000000')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(response => {
        expect(response.body.error).toBe('Passageiro não existe');
      });
  });

  it('should delete a passageiro by wrong id', async () => {
    await request(express.app)
      .delete('/v2/passageiro/' + 'wrongID')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500);
  });

  it('should delete a passageiro by id', async () => {
    await request(express.app)
      .delete('/v2/passageiro/' + bodyThird._id)
      .set('Accept', 'application/json')
      .expect('Content-Length', '0')
      .expect(200);
  });
});
