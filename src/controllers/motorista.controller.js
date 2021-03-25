const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const Motorista = require('../models/motorista.model');
const Viagem = require('../models/viagem.model');
const opentelemetry = require('@opentelemetry/api');
const tracer = opentelemetry.trace.getTracer('example-basic-tracer-node');

router.get('/motoristas/', async (req, res) => {
  const parentSpan = tracer.startSpan('/motoristas/');
  const motoristas = await Motorista.find();
  parentSpan.setStatus(200);
  parentSpan.end();
  return res.status(200).send({ motoristas });
});

router.get('/motorista/:id', async (req, res) => {
  const parentSpan = tracer.startSpan('GET:/motorista/:id');
  const { id } = req.params;
  try {
    const motorista = await Motorista.findById(id);
    if (motorista) {
      parentSpan.setStatus(200);
      parentSpan.end();
      return res.status(200).send({ motorista });
    } else {
      parentSpan.setStatus(400);
      parentSpan.end();
      return res.status(400).send({ error: 'Motorista não existe' });
    }
  } catch (err) {
    parentSpan.setStatus(500);
    parentSpan.end();
    return res.status(500).send({ error: err.message });
  }
});

router.delete('/motorista/:id', async (req, res) => {
  const parentSpan = tracer.startSpan('DELETE:/motorista/:id');
  const { id } = req.params;
  try {
    const motorista = await Motorista.findById(id);
    if (!motorista) {
      parentSpan.setStatus(400);
      parentSpan.end();
      return res.status(400).send({ error: 'Motorista não existe' });
    }
    await motorista.delete();
    parentSpan.setStatus(200);
    parentSpan.end();
    return res.status(200).send();
  } catch (err) {
    parentSpan.setStatus(500);
    parentSpan.end();
    return res.status(500).send({ error: err.message });
  }
});

router.put('/motorista/:id', async (req, res) => {
  const parentSpan = tracer.startSpan('PUT:/motorista/:id');
  const { id } = req.params;
  const { nome, email, marketing } = req.body;
  try {
    let motorista = await Motorista.findById(id);
    if (!motorista) {
      parentSpan.setStatus(400);
      parentSpan.end();
      return res.status(400).send({ error: 'Motorista não existe' });
    }
    if (typeof nome === 'string') {
      motorista.nome = nome;
    }
    if (typeof email === 'string') {
      motorista.email = email;
    }
    if (typeof marketing === 'boolean') {
      motorista.marketing = marketing;
    }
    motorista = await motorista.save();
    parentSpan.setStatus(201);
    parentSpan.end();
    return res.status(201).send({ motorista });
  } catch (err) {
    parentSpan.setStatus(500);
    parentSpan.end();
    return res.status(500).send({ error: err.message });
  }
});

router.post('/motorista/', async (req, res) => {
  const parentSpan = tracer.startSpan('POST:/motorista/');
  const { nome, email, marketing } = req.body;
  try {
    if (await Motorista.findOne({ email })) {
      parentSpan.setStatus(400);
      parentSpan.end();
      return res.status(400).send({ error: 'Motorista existente' });
    }
    if (typeof nome === 'string') {
      if (typeof email === 'string') {
        if (typeof marketing === 'boolean') {
          const motorista = await Motorista.create({ nome, email, marketing });
          parentSpan.setStatus(201);
          parentSpan.end();
          return res.status(201).send({ motorista });
        }
      }
    }
    parentSpan.setStatus(400);
    parentSpan.end();
    return res.status(400).send({ error: 'Dados incorreto' });
  } catch (err) {
    parentSpan.setStatus(500);
    parentSpan.end();
    return res.status(500).send({ error: err.message });
  }
});

router.post('/motorista/:idMotorista/viagem/:idViagem', async (req, res) => {
  const parentSpan = tracer.startSpan(
    'POST:/motorista/:idMotorista/viagem/:idViagem',
  );
  const { idMotorista, idViagem } = req.params;
  const { valor } = req.body;
  try {
    if (!process.env.EMAIL_APP) {
      throw 'EMAIL_APP Null';
    }
    const motorista = await Motorista.findById(idMotorista);
    if (!motorista) {
      parentSpan.setStatus(400);
      parentSpan.end();
      return res.status(400).send({ error: 'Motorista não existe' });
    }
    var viagem = await Viagem.findById(idViagem);
    if (!viagem) {
      parentSpan.setStatus(400);
      parentSpan.end();
      return res.status(400).send({ error: 'Viagem não existe' });
    }
    if (!viagem.passageiro) {
      parentSpan.setStatus(400);
      parentSpan.end();
      return res.status(400).send({ error: 'Passageiro não existe' });
    }
    viagem.valor = valor;
    viagem.motorista = motorista;
    viagem = await viagem.save();

    const email = {
      from: process.env.EMAIL_APP,
      to: viagem.passageiro.email + ', ' + process.env.EMAIL_FINANCEIRO,
      subject: 'Viagem aceita',
      text:
        'Viagem aceita pelo motorista' +
        viagem.motorista.nome +
        '. Por favor, pagar o valor de R$' +
        viagem.valor,
    };

    let testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    let info = await transporter.sendMail(email);

    parentSpan.setStatus(201);
    parentSpan.end();
    return res.status(201).send({
      msg:
        'Email enviado ao passageiro ' +
        viagem.passageiro.nome +
        ' e ao financeiro!',
      viagem,
      info: info.messageId,
    });
  } catch (err) {
    parentSpan.setStatus(500);
    parentSpan.end();
    return res.status(500).send({ error: err.message });
  }
});

module.exports = app => app.use('/v3/', router);
