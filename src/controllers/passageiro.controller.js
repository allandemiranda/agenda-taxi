const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const Passageiro = require('../models/passageiro.model');
const Viagem = require('../models/viagem.model');
const Motorista = require('../models/motorista.model');

router.get('/passageiros/', async (req, res) => {
  const passageiros = await Passageiro.find();
  return res.status(200).send({ passageiros });
});

router.get('/passageiro/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const passageiro = await Passageiro.findById(id);
    if (!passageiro) {
      return res.status(400).send({ error: 'Passageiro não existe' });
    }
    return res.status(200).send({ passageiro });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

router.delete('/passageiro/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const passageiro = await Passageiro.findById(id);
    if (!passageiro) {
      return res.status(400).send({ error: 'Passageiro não existe' });
    }
    await passageiro.delete();
    return res.status(200).send();
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

router.put('/passageiro/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, email, marketing } = req.body;
  try {
    let passageiro = await Passageiro.findById(id);
    if (!passageiro) {
      return res.status(400).send({ error: 'Passageiro não existe' });
    }
    if (typeof nome === 'string') {
      passageiro.nome = nome;
    }
    if (typeof email === 'string') {
      passageiro.email = email;
    }
    if (typeof marketing === 'boolean') {
      passageiro.marketing = marketing;
    }
    passageiro = await passageiro.save();
    return res.status(201).send({ passageiro });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

router.post('/passageiro/', async (req, res) => {
  const { nome, email, marketing } = req.body;
  try {
    if (await Passageiro.findOne({ email })) {
      return res.status(400).send({ error: 'Passageiro existe' });
    }
    if (typeof nome === 'string') {
      if (typeof email === 'string') {
        if (typeof marketing === 'boolean') {
          const passageiro = await Passageiro.create({
            nome,
            email,
            marketing,
          });
          return res.status(201).send({ passageiro });
        }
      }
    }
    return res.status(400).send({ error: 'Dados incorreto' });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

router.post('/passageiro/:id/viagem/', async (req, res) => {
  const { id } = req.params;
  const { origem, destino } = req.body;
  try {
    if (!process.env.EMAIL_APP) {
      throw 'EMAIL_APP Null';
    }
    const passageiro = await Passageiro.findById(id);
    if (!passageiro) {
      return res.status(400).send({ error: 'Passageiro deletado' });
    }

    const viagem = await Viagem.create({ origem, destino, passageiro });

    const motoristas = await Motorista.find();

    // let testAccount = await nodemailer.createTestAccount();
    // const transporter = nodemailer.createTransport({
    //   host: 'smtp.ethereal.email',
    //   port: 587,
    //   secure: false,
    //   auth: {
    //     user: testAccount.user,
    //     pass: testAccount.pass,
    //   },
    // });

    // let email = {
    //   from: process.env.EMAIL_APP,
    //   to: '',
    //   subject: 'Nova viagem disponível',
    //   text:
    //     'Nova viagem disponível de ' +
    //     viagem.origem +
    //     ' para ' +
    //     viagem.destino,
    // };

    // let infos = [];

    // for (let i = 0; i < motoristas.length; ++i) {
    //   email.to = motoristas[i].email;
    //   let info = await transporter.sendMail(email);
    //   infos.push(info.messageId);
    // }

    return res.status(201).send({
      msg: 'Email enviado aos motoristas !',
      motoristas,
      viagem,
      // infos,
    });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

module.exports = app => app.use('/v2/', router);
